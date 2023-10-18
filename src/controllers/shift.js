import { StatusCodes } from "http-status-codes";
import {
  createShift,
  deleteShift,
  findShiftById,
  findAllShifts,
  updateShift
} from "../services/shift/shift.service";
import { formatResponse } from "../utils/format";

export const createShiftController = async (req, res) => {
  try {
    const { body } = req;

    const shift = await createShift(body);

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
  try {
    const shifts = await findAllShifts();

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
