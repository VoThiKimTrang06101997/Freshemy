
import { Request, Response } from "express";
import service from "../services/index";
import CourseService from "../services/course.service";
import { RequestHasLogin } from "../types/request";
import { createCourseSchema, updateCourseSchema } from "../validations/course";
import { ValidationError } from "joi";
import { convertJoiErrorToString } from "../commons/index";
import services from "../services";
import { enrolledCourseSchema } from "../validations/course";


class CourseController {
    async editCourse(req: Request, res: Response): Promise<Response> {
        const errorValidate: ValidationError | undefined = updateCourseSchema.validate(req.body).error;

        if (errorValidate) {
            return res.status(400).json({
                status_code: 400,
                message: convertJoiErrorToString(errorValidate),
                success: false,
            });
        }

        const response = await services.CourseService.editCourse(req);
        return res.status(response.getStatusCode()).json(response);
    }
    
    async searchMyCourses(req: RequestHasLogin, res: Response): Promise<Response> {
        try {
            const { pageIndex, keyword } = req.query;
            const parsedPageIndex = parseInt(pageIndex as string, 10);
            const parsedKeyword = keyword as string;
            const userId = req.user_id || 0; // Gán giá trị mặc định là 0 nếu không có giá trị user_id

            const result = await services.CourseService.searchMyCourses(parsedPageIndex, parsedKeyword, userId);

            return res.status(result.status_code).json(result);
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message || "Internal Server Error",
                status_code: 500,
            });
        }
    }

    async deleteMyCourse(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const courseId = parseInt(id, 10);

            const result = await services.CourseService.deleteMyCourse(courseId);

            return res.status(result.status_code).json(result);
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: error.message || "Internal Server Error",
                status_code: 500,
            });
        }
    }

    async createCourse(req: RequestHasLogin, res: Response) {
        const errorValidate: ValidationError | undefined = createCourseSchema.validate(req.body).error;
        if (errorValidate) {
            return res.status(400).json({
                status_code: 400,
                message: convertJoiErrorToString(errorValidate),
                success: false,
            });
        }
        const response = await services.CourseService.createCourse(req);
        return res.status(response.getStatusCode()).json(response);
    }
    async getCourseDetail(req:Request, res:Response){
        const response = await service.CourseService.getCourseDetail(req)        
        return res.status(response.getStatusCode()).json(response)
    }

    async registerCourse(req:Request, res:Response){
        const errorValidate: ValidationError | undefined = enrolledCourseSchema.validate(req.body).error;
        if (errorValidate) {
            return res.status(400).json({
                status_code: 400,
                message: convertJoiErrorToString(errorValidate),
                success: false,
            });
        }
        const response = await service.CourseService.registerCourse(req)        
        return res.status(response.getStatusCode()).json(response)
    }

    
    async unsubcribeCourse(req:Request, res:Response){
        const errorValidate: ValidationError | undefined = enrolledCourseSchema.validate(req.body).error;

        if (errorValidate) {
            return res.status(400).json({
                status_code: 400,
                message: convertJoiErrorToString(errorValidate),
                success: false,
            });
        }
        const response = await service.CourseService.unsubcribeCourse(req)        
        return res.status(response.getStatusCode()).json(response)
    }

    async editThumbnail(req: RequestHasLogin, res: Response) {
        const response = await service.CourseService.editThumbnail(req);

        return res.status(response.getStatusCode()).json(response)
    }
}
export default CourseController;
