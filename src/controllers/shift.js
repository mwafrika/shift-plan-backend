import { StatusCodes } from "http-status-codes";
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
// import users model
import { User, Shift, EmployeeShift } from "../database/models/index";

export const createShiftController = async (req, res) => {
  try {
    const {
      employee, startDate, endDate, startTime, endTime
    } = req.body;
    // const user = await findUserById(userId);
    // if (!user) {
    //   return formatResponse(res, StatusCodes.NOT_FOUND, null, "User not found");
    // }

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

export const getAllShiftsController = async (req, res) => {
  const { companyId } = req.user;

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

    const shifts = await findAllShifts(
      {},
      {
        include: "employees"
      }
    );

    if (!shifts) {
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

export const assignShiftToUsers = async (req, res) => {
  try {
    const { userId, shiftId } = req.params;
    const user = await findUserById(userId);
    const shift = await findShiftById(shiftId);

    if (!user) {
      return formatResponse(res, StatusCodes.NOT_FOUND, null, "User not found");
    }

    if (!shift) {
      return formatResponse(
        res,
        StatusCodes.NOT_FOUND,
        null,
        "Shift not found"
      );
    }

    const newShift = await assignShiftToEmployee({ userId, shiftId });

    if (!newShift) {
      return formatResponse(
        res,
        StatusCodes.BAD_REQUEST,
        null,
        "Unable to assign shift"
      );
    }

    return formatResponse(
      res,
      StatusCodes.OK,
      newShift,
      "Shift assigned successfully"
    );
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message
    });
  }
};
