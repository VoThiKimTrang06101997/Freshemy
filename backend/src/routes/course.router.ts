import { Router } from "express";
import controllers from "../controllers/index";
import { uploadFileMdw } from "../middlewares/multer";
import { isLogin } from "../middlewares/isLogin";
import { isAuthor } from "src/middlewares/isAuthor";
const courseRouter: Router = Router();

courseRouter.get("/:course_id/section", isLogin, controllers.sectionController.getAllSectionByCourseId);

courseRouter.put("/change-information", isLogin, isAuthor, controllers.courseController.editCourse);
courseRouter.post("/", isLogin, isAuthor, uploadFileMdw, controllers.courseController.createCourse);
courseRouter.post("/registration", isLogin, controllers.courseController.registerCourse);
courseRouter.delete("/unsubcribe", isLogin, controllers.courseController.unsubcribeCourse);
courseRouter.patch("/change-thumbnail", isLogin, isAuthor, uploadFileMdw, controllers.courseController.editThumbnail);

courseRouter.get("/top-10", controllers.courseController.getTop10Courses);

courseRouter.get("/search-my-courses", isLogin, controllers.courseController.searchMyCourses);
courseRouter.get("/:slug", controllers.courseController.getCourseDetail);
courseRouter.get("/detail/:id", isLogin, controllers.courseController.getCourseDetailById);
courseRouter.delete("/:id", isLogin, isAuthor, controllers.courseController.deleteMyCourse);

export default courseRouter;
