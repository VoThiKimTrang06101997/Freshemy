import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

import { ResponseBase, ResponseError, ResponseSuccess } from "../commons/response";
import { MESSAGE_ERROR_INTERNAL_SERVER, MESSAGE_ERROR_BAD_REQUEST } from "../utils/constant";
import { db } from "../configs/db.config";

type CreateCategoryDTO = {
    title: string;
};

type UpdateCategoryDTO = {
    title: string;
};
export const createCategory = async (createCategoryDTO: CreateCategoryDTO) => {
    try {
        const category = await db.category.create({
            data: createCategoryDTO,
            select: {
                id: true,
                title: true,
            },
        });
        return new ResponseSuccess(200, "Category created successfully", true, category);
    } catch (error: any) {
        if (error instanceof PrismaClientKnownRequestError) {
            return new ResponseError(400, MESSAGE_ERROR_BAD_REQUEST, false);
        }
        return new ResponseError(500, MESSAGE_ERROR_INTERNAL_SERVER, false);
    }
};

export const getAllCategories = async () => {
    try {
        const categories = await db.category.findMany();
        return new ResponseSuccess(200, "Get all categories successfully", true, categories);
    } catch (error: any) {
        if (error instanceof PrismaClientKnownRequestError) {
            return new ResponseError(400, MESSAGE_ERROR_BAD_REQUEST, false);
        }
        return new ResponseError(500, MESSAGE_ERROR_INTERNAL_SERVER, false);
    }
};

export const getCategoryById = async (categoryId: number) => {
    try {
        const category = await db.category.findUnique({
            where: {
                id: categoryId,
            },
        });

        if (category) {
            return new ResponseSuccess(200, "Get category by id successfully", true, category);
        } else {
            return new ResponseError(404, "Category not found", false);
        }
    } catch (error: any) {
        if (error instanceof PrismaClientKnownRequestError) {
            return new ResponseError(400, MESSAGE_ERROR_BAD_REQUEST, false);
        }
        return new ResponseError(500, MESSAGE_ERROR_INTERNAL_SERVER, false);
    }
};

export const editCategory = async (categoryId: number, updateCategoryDTO: UpdateCategoryDTO) => {
    try {
        const existingCategory = await db.category.findUnique({
            where: {
                id: categoryId,
            },
        });

        if (!existingCategory) {
            return new ResponseError(404, "Category not found", false);
        }

        const updatedCategory = await db.category.update({
            where: {
                id: categoryId,
            },
            data: updateCategoryDTO,
            select: {
                id: true,
                title: true,
            },
        });

        return new ResponseSuccess(200, "Category updated successfully", true, updatedCategory);
    } catch (error: any) {
        if (error instanceof PrismaClientKnownRequestError) {
            return new ResponseError(400, MESSAGE_ERROR_BAD_REQUEST, false);
        }
        return new ResponseError(500, MESSAGE_ERROR_INTERNAL_SERVER, false);
    }
};

export const deleteCategory = async (categoryId: number) => {
    try {
        const existingCategory = await db.category.findUnique({
            where: {
                id: categoryId,
            },
        });

        if (!existingCategory) {
            return new ResponseError(404, "Category not found", false);
        }

        await db.category.delete({
            where: {
                id: categoryId,
            },
        });

        return new ResponseSuccess(200, "Category deleted successfully", true);
    } catch (error: any) {
        if (error instanceof PrismaClientKnownRequestError) {
            return new ResponseError(400, MESSAGE_ERROR_BAD_REQUEST, false);
        }
        return new ResponseError(500, MESSAGE_ERROR_INTERNAL_SERVER, false);
    }
};

const CategoryService = {
    createCategory,
    getAllCategories,
    getCategoryById,
    editCategory,
    deleteCategory,
};

export default CategoryService;