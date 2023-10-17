import { StatusCodes } from "http-status-codes";

import {
  createAbsence, getAllAbsence, getAbsenceById, updateAbsence, deleteAbsence
} from "../services/absence/absence.service";
import { formatResponse } from "../utils/format";
import { findUserById } from "../services/auth/auth.service";

export const createNewAbsence = async (req, res) => {
  try {
  const { id } = req.params;
  const { reason, date, userId } = req.body;

  const user = await findUserById(id);

  if (!user) {
    return formatResponse(
      res,
      StatusCodes.NOT_FOUND,
      null,
      "User not found"
    );
  }

  const newAbsence = await createAbsence({ reason, date, userId });

  if (newAbsence) {
    return formatResponse(
      res,
      StatusCodes.CREATED,
      {
        message: "Absence created successfully",
        absence: newAbsence
      }
    );
  }
    } catch (error) {
  return formatResponse(
    res,
    StatusCodes.INTERNAL_SERVER_ERROR,
    null
    error.message
  );
  }
};

export const findAllAbsence = async (req, res) => {
  try {
    const absence = await getAllAbsence({
      attributes: ["id", "startDate", "endDate", "createdAt", "updatedAt"],
      include: "users"
    });
    return formatResponse(res, StatusCodes.OK, absence);
  } catch (error) {
    return formatResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      null,
      error.message
    );
  }
};

export const updateAbsenceById = async (req, res) => {
  const { id } = req.params;
  const newAbsence = req.body;

  const user = await findUserById(id);

  if (!user) {
    return formatResponse(
      res,
      StatusCodes.NOT_FOUND,
      null,
      "User not found"
    );
  }

  const oldAbsence = await getAbsenceById(id);

  if (!oldAbsence) {
    return formatResponse(
      res,
      StatusCodes.NOT_FOUND,
      null,
      "Absence not found"
    );
  }

  const UpdatedAbsence = await updateAbsence(
    oldAbsence.id,
    newAbsence
  );

  if (!UpdatedAbsence) {
    return formatResponse(
      res,
      StatusCodes.NOT_FOUND,
      null,
      "Unable to update Absence"
    );
  }

  return formatResponse(res, StatusCodes.OK, {
    message: "Absence updated successfully"
  });
};

export const removeAbsence = async (req, res) => {
  try {
    const { id } = req.params;
    const absence = await deleteAbsence(id);

    if (!absence) {
      return formatResponse(
        res,
        StatusCodes.NOT_FOUND,
        null,
        "absence not found"
      );
    }
    return formatResponse(res, StatusCodes.OK, absence);
  } catch (error) {
    return formatResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      null,
      error.message
    );
  }
};
