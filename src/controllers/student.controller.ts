import { StudentService } from "src/services/student.service";
import { NextFunction, Request, Response } from "express";
import { StatusCode } from "src/utils/consts";
import { logger } from "src/utils/logger";
import { IStudent } from "src/database/model/@types/student.type";
import APIError from "src/errors/api-error";
import { StudentUpdate } from "src/database/repositories/@types/student.type";

export class StudentController {
  private stdService: StudentService;
  constructor() {
    this.stdService = new StudentService();
  }
  async createStudent(studentData: IStudent) {
    try {
      return await this.stdService.createStudent(studentData);
    } catch (error: unknown | any) {
      logger.error("Error creating student:", error);
      throw new APIError(
        `An error occurred during Adding new Student: ${error.message}`,
        StatusCode.InternalServerError
      );
    }
  }
  async getStudentById(studId: string) {
    try {
      return await this.stdService.getStudentById(studId);
    } catch (error: unknown | any) {
      logger.error("Error get student:", error);
      throw new APIError(error.message, StatusCode.NotFound);
    }
  }
  async searchStudents(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const query = req.query.q as string;
      const students = await this.stdService.findStudentByQueries(query);
      res.status(200).json(students);
    } catch (error: any) {
      next(error);
    }
  }
  async updateStudent(stdId: string, updateStd: StudentUpdate) {
    try {
      const isStdExisted = await this.stdService.getStudentById(stdId);
      if (!isStdExisted) {
        throw new APIError("Student not found", StatusCode.NotFound);
      }

      return await this.stdService.updateStudent(stdId, updateStd);
    } catch (error: unknown | any) {
      logger.error("Error updating student:", error);
    }
  }
  async deleteStudent(studId: string) {
    try {
      return await this.stdService.deleteStudent(studId);
    } catch (error: unknown | any) {
      logger.error("Error deleting student:", error);
    }
  }
}
