import { StatusCodes } from "http-status-codes";
import { isAfter, isBefore } from "date-fns";
import { Op, Sequelize } from "sequelize";
import moment from "moment";
import {
  createShift,
  deleteShift,
  findShiftById,
  findAllShifts,
  updateShift,
  assignShiftToEmployee
} from "../services/shift/shift.service";
import { formatResponse } from "../utils/format";
import { findUserById } from "../services/auth/auth.service";
import { findCompanyById } from "../services/company/company.service";
import Socket from "../services/shift/shiftSocket";
import { EmployeeShift, Shift, User } from "../database/models/index";

export const createShiftController = async (req, res) => {
  try {
    const {
      employee, startDate, endDate, startTime, endTime
    } = req.body;

    const shift = await createShift({
      employee,
      startDate,
      endDate,
      startTime,
      endTime
    });

    if (!shift) {
      return formatResponse(
        res,
        StatusCodes.BAD_REQUEST,
        null,
        "Unable to create shift"
      );
    }

    return formatResponse(
      res,
      StatusCodes.CREATED,
      shift,
      "Shift created successfully"
    );
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message
    });
  }
};

function isValidDate(dateString) {
  const parsedDate = Date.parse(dateString);
  return !isNaN(parsedDate);
}

export const getAllShiftsController = async (req, res) => {
  const { companyId } = req.user;
  const { startDate, endDate } = req.query;

  const isAllowed = findCompanyById(companyId);

  try {
    if (!isAllowed) {
      return formatResponse(
        res,
        StatusCodes.UNAUTHORIZED,
        null,
        "You are not allowed to view shifts"
      );
    }

    const filters = { companyId };
    const where = {};

    if (isValidDate(startDate) && isValidDate(endDate)) {
      where.createdAt = {
        [Op.gte]: new Date(startDate),
        [Op.lte]: new Date(endDate)
      };
    }

    const shifts = await Shift.findAll({
      where: filters,
      include: [
        {
          model: User,
          attributes: ["id", "name", "email", "address", "phone"],
          include: [
            {
              model: EmployeeShift,
              as: "shifts",
              attributes: [
                "description",
                "startDate",
                "endDate",
                "createdAt",
                "updatedAt"
              ],
              where
            }
          ]
        }
      ]
    });

    if (!shifts || shifts.length === 0) {
      return formatResponse(
        res,
        StatusCodes.NOT_FOUND,
        null,
        "No shifts found"
      );
    }
    
    return formatResponse(
      res,
      StatusCodes.OK,
      shifts,
      "Shifts retrieved successfully"
    );
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message
    });
  }
};

export const getShiftByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const shift = await findShiftById(id);

    if (!shift) {
      return formatResponse(
        res,
        StatusCodes.NOT_FOUND,
        null,
        "Shift not found"
      );
    }

    return formatResponse(
      res,
      StatusCodes.OK,
      shift,
      "Shift retrieved successfully"
    );
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message
    });
  }
};

export const updateShiftController = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const shift = await findShiftById(id);

    if (!shift) {
      return formatResponse(
        res,
        StatusCodes.NOT_FOUND,
        null,
        "Shift not found"
      );
    }

    const updatedShift = await updateShift(body, { id });

    if (!updatedShift) {
      return formatResponse(
        res,
        StatusCodes.BAD_REQUEST,
        null,
        "Unable to update shift"
      );
    }

    Socket.emitShiftUpdated(id, updatedShift);

    const data = await findShiftById(id);

    return formatResponse(
      res,
      StatusCodes.OK,
      data,
      "Shift updated successfully"
    );
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message
    });
  }
};

export const deleteShiftController = async (req, res) => {
  try {
    const { id } = req.params;
    const shift = await findShiftById(id);

    if (!shift) {
      return formatResponse(
        res,
        StatusCodes.NOT_FOUND,
        null,
        "Shift not found"
      );
    }

    const deletedShift = await deleteShift({ id });

    if (!deletedShift) {
      return formatResponse(
        res,
        StatusCodes.BAD_REQUEST,
        null,
        "Unable to delete shift"
      );
    }

    return formatResponse(
      res,
      StatusCodes.OK,
      null,
      "Shift deleted successfully"
    );
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message
    });
  }
};

const assignShiftsToUsers = async (userIDs, shiftId, startDate, endDate) => Promise.all(
  userIDs.map(async (userId) => {
    const user = await findUserById(userId);
    if (!user) {
      return {
        success: false,
        message: `User with ID ${userId} not found`
      };
    }

    const existingShift = await EmployeeShift.findOne({
      where: {
        userId,
        shiftId,
        startDate
      }
    });
    if (existingShift) {
      return {
        success: false,
        message: `User with ID ${userId} already assigned to this shift`
      };
    }

    const newShift = await assignShiftToEmployee({
      userId,
      shiftId,
      startDate,
      endDate
    });
    if (!newShift) {
      return {
        success: false,
        message: `Unable to assign shift to user with ID ${userId}`
      };
    }

    return {
      success: true,
      message: `Shift assigned to user with ID ${userId} successfully`
    };
  })
);

export const assignShiftToUsers = async (req, res) => {
  try {
    const {
      userIDs, shiftId, startDate, endDate
    } = req.body;
    const shiftID = parseInt(shiftId, 10);

    if (
      !Array.isArray(userIDs)
      || !userIDs.length
      || !shiftID
      || !startDate
      || !endDate
    ) {
      return formatResponse(
        res,
        StatusCodes.BAD_REQUEST,
        null,
        "Invalid request data"
      );
    }

    const shift = await findShiftById(shiftID);

    if (!shift) {
      return formatResponse(
        res,
        StatusCodes.NOT_FOUND,
        null,
        "Shift not found"
      );
    }

    const assignments = await assignShiftsToUsers(
      userIDs,
      shiftID,
      startDate,
      endDate
    );

    const failedAssignments = assignments.filter((result) => !result.success);

    if (failedAssignments.length > 0) {
      return formatResponse(
        res,
        StatusCodes.BAD_REQUEST,
        null,
        "Unable to assign shift to some users",
        {
          failedAssignments
        }
      );
    }

    return formatResponse(
      res,
      StatusCodes.OK,
      null,
      "Shift assigned to users successfully"
    );
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message
    });
  }
};
