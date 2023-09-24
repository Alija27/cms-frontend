import React from 'react'
import Layout from '../../../shared/dashboard/Layout'
import { TableLayout, Table, THead, TBody, TableActions } from "../../../shared/table/Table"
import Buttons from "../../../shared/buttons/Buttons"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { useEffect, useState } from 'react'
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
import {  getAllStudents } from '../../../../app/feature/Student/StudentApi'
import { getAllBatches } from '../../../../app/feature/Batch/BatchApi'
import { createFinalExamReport, deleteFinalExamReport, getAllFinalExamReports, updateFinalExamReport } from '../../../../app/feature/FinalExamReport/FinalExamReportApi'
import Select from 'react-select/dist/declarations/src/Select'

const FinalExamReport = () => {
    const dispatch = useAppDispatch();
    const studentState = useAppSelector((store) => store.StudentSlice);
    const departmentState = useAppSelector((store) => store.DepartmentSlice);
    const courseState = useAppSelector((store) => store.CourseSlice);
    const batchState = useAppSelector((store) => store.BatchSlice);
    const semesterState = useAppSelector((store) => store.SemesterSlice);
    const finalExamReportState = useAppSelector((store) => store.FinalExamReportSlice);
    const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [selectedBatch, setSelectedBatch] = useState<any>(null);
    const [selectedSemester, setSelectedSemester] = useState<any>(null);


   
    useEffect(() => {
        dispatch(getAllDepartments());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllSemesters());
    }, [dispatch]);
    
    useEffect(() => {
        dispatch(getAllBatches());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllStudents(null));
    }, [dispatch]);
     
    
    useEffect(() => {
        dispatch(getAllCourses(selectedDepartment));
    }, [dispatch, selectedDepartment]);
    useEffect(() => {
        dispatch(getAllFinalExamReports(null));
    }, [dispatch]);


    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedFinalExamReport, setSelectedFinalExamReport] = useState<any>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    const onCancel = () => {
        setShowAddModal(false);
        setSelectedFinalExamReport(null);
        reset();
    }

    const onCancelDeleteModal = () => {
        setShowDeleteModal(false);
        reset();
    }

    const handleDelete = async () => {
        await dispatch(deleteFinalExamReport(selectedFinalExamReport?.id)).then((res: any) => {
            if (res.payload.success) {
                setShowDeleteModal(false);
                setSelectedFinalExamReport(null);
                reset();
            }
        })
    }



    

    const handleStudentChange = (option: any, actionMeta: any) => {
        console.log(option);
        setValue("student_id", option.value);
    }

    const handleCourseChange = (option: any, actionMeta: any) => {
        console.log(option);
        
        setValue("course_id", option.value);
        setSelectedCourse(option.value);
    }

    const handleBatchChange = (option: any, actionMeta: any) => {
        console.log(option);
        setValue("batch_id", option.value);
        setSelectedBatch(option.value);
    }

    const handleSemesterChange = (option: any, actionMeta: any) => {
        console.log(option);
        setValue("semester_id", option.value);
        setSelectedSemester(option.value);
        
    }

  
    useEffect(() => {
        if(selectedCourse && selectedBatch && selectedSemester){
            dispatch(getAllFinalExamReports({selectedCourse, selectedBatch, selectedSemester}));
        }
    }, [selectedCourse, selectedBatch, selectedSemester]);


    const onsubmit = async (data: any) => {
        // set value of department_id, course_id, subject_id to what is selected in dropdown
        if (selectedFinalExamReport) {
            await dispatch(updateFinalExamReport({ data, id: selectedFinalExamReport?.id })).then((res: any) => {
                if (res.payload.success) {
                    setShowAddModal(false);
                    setSelectedFinalExamReport(null);
                    reset();
                }
            });
        } else {
            await dispatch(createFinalExamReport(data)).then((res: any) => {
                if (res.payload.success) {
                    setShowAddModal(false);
                    reset();
                    getAllFinalExamReports(null);
                }
            });
        }
    }

    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        mode: "onChange",
        resolver: yupResolver(
            yup.object().shape({
               student_id: yup.string().required(),
                course_id: yup.string().required(),
                semester_id: yup.string().required(),
                date: yup.string().required(),
                position: yup.string().required(),
                grade: yup.string().required(),
                gpa: yup.string().required(),

                batch_id: yup.string().required(),
            })
        ),
    })

    useEffect(() => {

        if (selectedFinalExamReport) {
            
            setValue("student_id", selectedFinalExamReport?.student_id);
            setValue("semester_id", selectedFinalExamReport?.semester_id);
            setValue("date", selectedFinalExamReport?.date);
            setValue("position", selectedFinalExamReport?.position);
            setValue("grade", selectedFinalExamReport?.grade);
            setValue("gpa", selectedFinalExamReport?.gpa);
            setValue("course_id", selectedFinalExamReport?.course_id);
            setValue("batch_id", selectedFinalExamReport?.batch_id);
        }
    }, [selectedFinalExamReport, setValue]);
    

    return (
        <>
            <Layout>
                <div className="w-full">
                    <TableLayout heading="Final Exam Report"
                        rightheading={
                       <div className="flex gap-2"> 

                    
                        <SelectInput
                            name="course_id"
                            register={register}
                            options={courseState.courses.map((course: any) => ({
                                value: course.id,
                                label: course?.course_name
                            }))}
                            placeholder="Select Course"

                            onChange={handleCourseChange}

                        />
                         <SelectInput
                            name="semester_id"
                            register={register}
                            options={semesterState.semesters.map((semester: any) => ({
                                value: semester.id,
                                label: semester?.name
                            }))}
                            placeholder="Select Semester"
                            onChange={handleSemesterChange}


                        />
                          
                          <SelectInput
                          name="batch_id"
                            register={register}
                            options={batchState.batches.map((batch: any) => ({
                                value: batch.id,
                                label: batch?.year
                            }))}
                            placeholder="Select Batch"
                            onChange={handleBatchChange}
                            />
                        <Buttons
                            text="Add New"
                            type="button"
                            className="dashboardlink"
                            onClick={() => {
                                console.log("Button clicked");
                                setShowAddModal(true)
                            }}
                        />
                        </div>}>
                        <div >
                            <Table >
                                <THead>
                                    <tr>
                                        <th>SN</th>
                                        <th>Name</th>
                                        <th>Semester</th>
                                        <th>Date</th>
                                        <th>Position</th>
                                        <th>Grade</th>
                                        <th>GPA</th>
                                        <th>Course</th>
                                        <th>Batch</th>
                                       
                                        <th>Action</th>


                                    </tr>
                                </THead>
                                <TBody>
                                    {finalExamReportState.final_exam_reports.map((finalexamreport: any, index) => (
                                        <tr key={finalexamreport?.id}>
                                            <td>{index + 1}</td>
                                            <td>{finalexamreport?.student_name}</td>
                                            <td>{finalexamreport?.semester_name}</td>
                                            <td>{finalexamreport?.date}</td>
                                            <td>{finalexamreport?.position}</td>
                                            <td>{finalexamreport?.grade}</td>
                                            <td>{finalexamreport?.gpa}</td>
                                            <td>{finalexamreport?.course_name}</td>
                                            <td>{finalexamreport?.batch_year}</td>
                                           
                                            <TableActions>
                                                <div className="hover:text-blue-800">
                                                    <FaEdit size={20} onClick={() => {
                                                        setSelectedFinalExamReport(finalexamreport);
                                                        setShowAddModal(true);
                                                    }} />
                                                </div>
                                                <div className="hover:text-red-800">
                                                    <FaTrash size={20} onClick={() => {
                                                        setSelectedFinalExamReport(finalexamreport);
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
                        {selectedFinalExamReport ? "Update User" : "Add User"}
                    </ModalHeader>
                    <ModalBody>
                        <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onsubmit)}>
                            <SelectInput
                            text="Student"
                                name="student_id"
                                register={register}
                                options={studentState.students.map((student: any) => ({
                                    value: student.id,
                                    label: student?.user?.user_name
                                }))}
                                error={errors?.student_id?.message}
                                onChange={handleStudentChange}
                                placeholder="Select Student"
                                />
                           

                            <TextFields
                                name="date"
                                label="Date"
                                type="date"
                                register={register}
                                error={errors?.date?.message}
                                placeholder="Enter Date"
                            />

                            <TextFields
                                name="position"
                                label="Position"
                                type="number"
                                register={register}
                                error={errors?.position?.message}
                                placeholder="Enter Position"
                            />

                            <TextFields
                                name="grade"
                                label="Grade"
                                type="text"
                                register={register}
                                error={errors?.grade?.message}
                                placeholder="Enter Grade"
                            />

                            <TextFields
                                name="gpa"
                                label="GPA"
                                type="text"
                                register={register}
                                error={errors?.gpa?.message}
                                placeholder="Enter GPA"
                            />

                                
                                
                            <SelectInput
                            text="Semester"
                                name="semester_id"
                                register={register}
                                options={semesterState.semesters.map((semester: any) => ({
                                    value: semester.id,
                                    label: semester?.name
                                }))}
                                error={errors?.semester_id?.message}
                                onChange={handleSemesterChange}
                                placeholder="Select Semester"
                                />

                          
                                <SelectInput
                                 text="Course"
                                    name="course_id"
                                    register={register}
                                    options={courseState.courses.map((course: any) => ({
                                        value: course.id,
                                        label: course?.course_name
                                    }))}
                                    onChange={handleCourseChange}
                                    error={errors?.course_id?.message}
                                    placeholder="Select Course"
                                   
                                />

                           

        
                                <SelectInput
                                text="Batch"
                                    name="batch_id"
                                    register={register}
                                    options={batchState.batches.map((batch: any) => ({
                                        value: batch.id,
                                        label: batch.year
                                    }))}
                                    error={errors?.batch_id?.message}
                                    onChange={handleBatchChange}
                                    placeholder="Select Batch"
                                     /* defaultValue={selectedFinalExamReport ? selectedFinalExamReport?.batch?.map((batch: any) => ({
                                        value: batch.id,
                                        label: batch.year
                                    })) : []} *//>         
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

export default FinalExamReport