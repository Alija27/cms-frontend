import React from 'react'
import Layout from '../../../shared/dashboard/Layout'
import { TableLayout, Table, THead, TBody, TableActions } from "../../../shared/table/Table"
import Buttons from "../../../shared/buttons/Buttons"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { useEffect, useState } from 'react'
import { getAllTeachers, createTeacher, updateTeacher, deleteTeacher } from '../../../../app/feature/Teacher/TeacherApi'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../shared/modals/Modal'
import TextFields from '../../../shared/inputs/TextFields'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { DeleteModal } from '../../../shared/modals/DeleteModal'
import { SelectInput } from '../../../shared/inputs/SelectInput'
import { getAllSemesters } from '../../../../app/feature/Semester/SemesterApi'
import { getAllDepartments } from '../../../../app/feature/Department/DepartmentApi'
import { getAllCourses } from '../../../../app/feature/Course/CourseApi'
import { set, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { getAllSubjects } from '../../../../app/feature/Subject/SubjectApi'


const Teachers = () => {
    const dispatch = useAppDispatch();
    const teacherState = useAppSelector((store) => store.TeacherSlice);
    const semesterState = useAppSelector((store) => store.SemesterSlice);
    const departmentState = useAppSelector((store) => store.DepartmentSlice);
    const courseState = useAppSelector((store) => store.CourseSlice);
    const subjectState = useAppSelector((store) => store.SubjectSlice);
    const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);


    useEffect(() => {
        dispatch(getAllSemesters());
    }, [dispatch]);
    useEffect(() => {
        dispatch(getAllDepartments());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllSubjects(selectedCourse));
    }, [dispatch, selectedCourse]);
    useEffect(() => {
        dispatch(getAllCourses(selectedDepartment));
    }, [dispatch, selectedDepartment]);
    useEffect(() => {
        dispatch(getAllTeachers());
    }, [dispatch]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    const onCancel = () => {
        setShowAddModal(false);
        setSelectedTeacher(null);
        reset();
    }

    const onCancelDeleteModal = () => {
        setShowDeleteModal(false);
        reset();
    }

    const handleDelete = async () => {
        await dispatch(deleteTeacher(selectedTeacher?.id)).then((res: any) => {
            if (res.payload.success) {
                setShowDeleteModal(false);
                setSelectedTeacher(null);
                reset();
            }
        })
    }



    const handleDepartmentChange = (option: any, actionMeta: any) => {
        console.log(option);
        const value = option.map((opt: any) => opt.value);
        setSelectedDepartment(value);
        setValue("department_id", value);
    }

    const handleSubjectChange = (option: any, action: any) => {
        console.log(option);
        const value = option.map((opt: any) => opt.value);
        setValue("subject_id", value);
    }

    const handleCourseChange = (option: any, actionMeta: any) => {
        console.log(option);
        const value = option.map((opt: any) => opt.value);
        setSelectedCourse(value);
        setValue("course_id", value);
    }

    const onsubmit = async (data: any) => {
        // set value of department_id, course_id, subject_id to what is selected in dropdown
        if (selectedTeacher) {
            await dispatch(updateTeacher({ data, id: selectedTeacher?.id })).then((res: any) => {
                if (res.payload.success) {
                    setShowAddModal(false);
                    setSelectedTeacher(null);
                    reset();
                }
            });
        } else {
            await dispatch(createTeacher(data)).then((res: any) => {
                if (res.payload.success) {
                    setShowAddModal(false);
                    reset();
                    getAllTeachers();
                }
            });
        }
    }

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        mode: "onChange",
        resolver: yupResolver(
            yup.object().shape({
                user_name: yup.string().required(),
                email: yup.string().required(),
                password: yup.string().required(),
                address: yup.string().required(),
                phonenumber: yup.string().required(),
                date_of_birth: yup.string().required(),
                department_id: yup.array().required(),
                course_id: yup.array().required(),
                subject_id: yup.array().required(),
            })
        ),
    })

    useEffect(() => {

        if (selectedTeacher) {
            console.log(selectedTeacher)
            setSelectedDepartment(selectedTeacher?.department.id);
            setValue("user_name", selectedTeacher?.user_name);
            setValue("email", selectedTeacher?.email);
            setValue("password", selectedTeacher?.password);
            setValue("address", selectedTeacher?.address);
            setValue("phonenumber", selectedTeacher?.phonenumber);
            setValue("date_of_birth", selectedTeacher?.date_of_birth);
            setValue("department_id", selectedTeacher?.department.id);
            setValue("course_id", selectedTeacher?.course.id);
            setValue("subject_id", selectedTeacher?.subject.id);
        }
    }, [selectedTeacher, setValue]);
    console.log("selected Teacher", selectedTeacher);

    return (
        <>
            <Layout>
                <div className="w-full">
                    <TableLayout heading="Teachers"
                        rightheading={<Buttons
                            text="Add New"
                            type="button"
                            className="dashboardlink"
                            onClick={() => {
                                console.log("Button clicked");
                                setShowAddModal(true)
                            }}
                        />}>
                        <div >
                            <Table >
                                <THead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Department</th>

                                        <th>Course</th>
                                        <th>Subject</th>
                                        <th>Action</th>


                                    </tr>
                                </THead>
                                <TBody>
                                    {teacherState.teachers.map((teacher: any, index) => (
                                        <tr key={teacher?.id}>
                                            <td>{index + 1}</td>
                                            <td>{teacher?.user_name}</td>
                                            <td>{teacher?.email}</td>
                                            {teacher?.department.map((department: any, index: any) => (
                                                <span key={department.id}>{department.name}


                                                    {index !== teacher.department.length - 1 ? ', ' : ''}</span>
                                            ))}

                                            <td>
                                                {teacher?.course.map((course: any, index: any) => (
                                                    <span key={course.id}>{course.course_name}
                                                        {index !== teacher.department.length - 1 ? ', ' : ''}</span>
                                                ))}
                                            </td>
                                            <td>{teacher?.subject.map((subject: any, index: any) => (
                                                <span key={subject.id}>{subject.subject_name}
                                                    {index !== teacher.subject.length - 1 ? ', ' : ''}</span>
                                            ))}</td>
                                            <TableActions>
                                                <div className="hover:text-blue-800">
                                                    <FaEdit size={20} onClick={() => {
                                                        setSelectedTeacher(teacher);
                                                        setShowAddModal(true);
                                                    }} />
                                                </div>
                                                <div className="hover:text-red-800">
                                                    <FaTrash size={20} onClick={() => {
                                                        setSelectedTeacher(teacher);
                                                        setShowDeleteModal(true);

                                                    }} />
                                                </div>
                                            </TableActions>
                                        </tr>
                                    ))}
                                </TBody>
                            </Table>
                        </div>
                    </TableLayout>
                </div>
            </Layout>
            {showAddModal ? (
                <Modal >
                    <ModalHeader>
                        {selectedTeacher ? "Update User" : "Add User"}
                    </ModalHeader>
                    <ModalBody>
                        <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onsubmit)}>
                            <TextFields
                                name="user_name"
                                register={register}
                                type="text"
                                placeholder="Enter your name here"
                                error={errors.user_name?.message}
                                label="Name" />
                            <TextFields
                                name="email"
                                register={register}
                                type="email"
                                placeholder="Enter your email here"
                                error={errors.email?.message}
                                label="Email" />
                            <TextFields
                                name="password"
                                register={register}
                                type="password"
                                placeholder="Enter your password here"
                                error={errors.password?.message}
                                label="Password" />
                            <TextFields
                                name="address"
                                register={register}
                                type="text"
                                placeholder="Enter your address here"
                                error={errors.address?.message}
                                label="Address" />
                            <TextFields
                                name="phonenumber"
                                register={register}
                                type="text"
                                placeholder="Enter your phone here"
                                error={errors.phonenumber?.message}
                                label="Phone" />
                            <TextFields
                                name="date_of_birth"
                                register={register}
                                type="date"
                                placeholder="Enter your date of birth here"
                                error={errors.date_of_birth?.message}
                                label="Date of Birth" />

                            <SelectInput
                                name="department_id"
                                register={register}
                                options={departmentState.departments.map((department: any) => ({
                                    value: department.id,
                                    label: department.name
                                }))}
                                onChange={handleDepartmentChange}
                                error={errors.department_id?.message}
                                 defaultValue={selectedTeacher ? selectedTeacher?.department?.map((department: any) => ({
                                    value: department.id,
                                    label: department.name
                                    })) : []} 
                                isMulti
                            />

                            {(selectedDepartment && selectedDepartment.length > 0) && (
                                <SelectInput
                                    name="course_id"
                                    register={register}
                                    options={courseState.courses.map((course: any) => ({
                                        value: course.id,
                                        label: course.course_name
                                    }))}
                                     defaultValue={selectedTeacher ? selectedTeacher?.course?.map((course: any) => ({
                                        value: course.id,
                                        label: course.course_name
                                    })) : []} 
                                    onChange={handleCourseChange}
                                    error={errors.course_id?.message}
                                    isMulti
                                />

                            )
                            }

                            {(selectedDepartment && selectedCourse && selectedCourse.length > 0)&& (
                                <SelectInput
                                    name="subject_id"
                                    register={register}
                                    options={subjectState.subjects.map((subject: any) => ({
                                        value: subject.id,
                                        label: subject.subject_name + " " + "(" + subject.course_name + ")"
                                    }))}
                                    onChange={handleSubjectChange}
                                     defaultValue={selectedTeacher ? selectedTeacher?.subject?.map((subject: any) => ({
                                        value: subject.id,
                                        label: subject.subject_name 
                                    })) : []
                                    } 
                                    error={errors.subject_id?.message}
                                    isMulti

                                />
                            )}

                            <ModalFooter className="justify-end">
                                <Buttons text="Cancel" type="submit" className="bg-gray-500"
                                    onClick={onCancel}
                                />
                                <Buttons text="Save" type="submit" className="dashboardlink" />
                            </ModalFooter>
                        </form>
                    </ModalBody>
                </Modal>)
                : ""}

            {showDeleteModal ? (
                <DeleteModal>
                    <button className="bg-red-500 text-white px-3 py-2 rounded-md" onClick={handleDelete}>Delete</button>
                    <button className="bg-gray-500 text-white px-3 py-2 rounded-md" onClick={onCancelDeleteModal} >Cancel</button>
                </DeleteModal>
            ) : ""}
        </>



    )
}

export default Teachers