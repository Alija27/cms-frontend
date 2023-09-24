import Layout from '../../../shared/dashboard/Layout'
import { TableLayout, Table, THead, TBody, TableActions } from "../../../shared/table/Table"
import Buttons from "../../../shared/buttons/Buttons"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../shared/modals/Modal'
import TextFields from '../../../shared/inputs/TextFields'
import { set, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { FaEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { DeleteModal } from '../../../shared/modals/DeleteModal'
import { getAllExams } from '../../../../app/feature/Exam/ExamApi'
import { getAllCourses } from '../../../../app/feature/Course/CourseApi'
import { getAllSemesters } from '../../../../app/feature/Semester/SemesterApi'
import { getAllSubjects } from '../../../../app/feature/Subject/SubjectApi'
import { getAllTeachers } from '../../../../app/feature/Teacher/TeacherApi'
import { getAllResults, createResult, updateResult, deleteResult } from '../../../../app/feature/Result/ResultApi'
import { SelectInput } from '../../../shared/inputs/SelectInput'
import { getAllStudents } from '../../../../app/feature/Student/StudentApi'






export const Results = () => {

  const dispatch = useAppDispatch();
  const resultState = useAppSelector((store) => store.ResultSlice);
  const examState = useAppSelector((store) => store.ExamSlice);
  const semesterState = useAppSelector((store) => store.SemesterSlice);
  const courseState = useAppSelector((store) => store.CourseSlice);
  const studentState = useAppSelector((store) => store.StudentSlice);

  //select user
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedSemester, setSelectedSemester] = useState<any>(null);


  //select result
  const [selectedResult, setSelectedResult] = useState<any>(null);

  //display results
  useEffect(() => {
    dispatch(getAllResults());
  }, [dispatch]);

  //display all Exames
  useEffect(() => {
    dispatch(getAllExams({ course_id: selectedCourse, semester_id: selectedSemester }));
  }, [dispatch, selectedCourse, selectedSemester]);


  useEffect(() => {
    dispatch(getAllCourses(null));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllSemesters());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllStudents(selectedCourse));
  }, [dispatch, selectedCourse]);

  useEffect(() => {
    dispatch(getAllTeachers());
  }, [dispatch]);



  //display modal to add a new result
  const [showAddModal, setShowAddModal] = useState(false);

  //select result to edit
  const [selectedExam, setSelectedExam] = useState<any>(null);



  //delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onCancel = () => {
    setShowAddModal(false);
    setSelectedResult(null);
    setSelectedCourse(null);
    setSelectedSemester(null);
    reset();
  }

  const onCancelDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedResult(null);
    reset();
  }
  //form data submit
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    mode: "onChange",
    resolver: yupResolver(
      yup.object().shape({
        course_id: yup.string().required("Course is required"),
        semester_id: yup.string().required("Semester is required"),
        status: yup.string().required("Status is required"),
        marks: yup.string().required("Marks is required"),
        exam_id: yup.string().required("Exam is required"),
        student_id: yup.string().required("Student is required"),
      })
    ),
  })

  useEffect(() => {
    if (selectedResult) {
      setValue("course_id", selectedResult?.course_id);
      setValue("semester_id", selectedResult?.semester_id);
      setValue("marks", selectedResult?.marks);
      setValue("exam_id", selectedResult?.exam_id);
      setValue("student_id", selectedResult?.student_id);
      setValue("status", selectedResult?.status);

    }

  }, [selectedResult, setValue]);
  const onsubmit = async (data: any) => {

    if (selectedResult) {
      await dispatch(updateResult({ data, id: selectedExam?.id })).then((res: any) => {
        if (res.payload.success) {
          reset();
          onCancel();

        }
      });
    }
    else {
      await dispatch(createResult(data)).then((res: any) => {
        console.log("here");
        if (res.payload.success) {
          console.log("here");
          reset();
          onCancel();

        }
      });
    }
  };




  const handleCourseChange = (option: any, actionMeta: any) => {
    console.log(option.value);
    setSelectedCourse(option.value)
    setValue("course_id", option.value);
  }

  const handleSemesterChange = (option: any, actionMeta: any) => {
    setValue("semester_id", option.value);
    setSelectedSemester(option.value);

  }

  const handleExamChange = (option: any, actionMeta: any) => {
    setValue("exam_id", option.value);
  }

  const handleStudentChange = (option: any, actionMeta: any) => {
    console.log(option.value);
    setValue("student_id", option.value);
  }
  
  const handleStatusChange = (option: any, actionMeta: any) => {
    console.log(option.value);
    setValue("status", option.value);
  }



  const handleDelete = async () => {
    await dispatch(deleteResult(selectedResult?.id)).then((res: any) => {
      console.log(selectedResult?.id);
      if (res.payload.success) {
        setShowDeleteModal(false);
        reset();
        setSelectedResult(null);

      }
    });
  };


  return (
    <>
      <Layout>
        <div className="w-full">
          <TableLayout heading="results"
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
                    <th>Student</th>
                    <th>Course</th>
                    <th>Subject</th>
                    <th>Semester</th>
                    <th>Status</th>
                    <th>Marks</th>
                    <th>Actions</th>

                  </tr>
                </THead>
                <TBody>
                  {resultState.results.map((result: any, index) => (
                    <tr key={result?.id}>
                      <td>{index + 1}</td>
                      <td>{result?.student?.user?.user_name}</td>
                      <td>{result?.exam?.course?.course_name}</td>
                      <td>{result?.exam?.subject?.subject_name}</td>
                      <td>{result?.exam?.semester?.name}</td>
                      <td>{result?.status}</td>
                      <td>{result?.marks}</td>
                      <TableActions>
                        {/* <div className="hover:text-blue-800">
                          <FaEdit size={20} onClick={() => {
                            setSelectedResult(result);
                            setShowAddModal(true);
                          }} />
                        </div> */}

                        <div className="hover:text-red-800">
                          <AiFillDelete size={20} onClick={() => {
                            setSelectedResult(result);
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
            {selectedExam ? "Edit result" : "Add result"}
          </ModalHeader>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onsubmit)} >
            <ModalBody>


              <SelectInput
                register={register}
                error={errors?.course_id?.message}
                name="course_id"
                options={courseState.courses.map((course: any) => ({
                  label: course?.course_name,
                  value: course?.id,
                }))
                }

                onChange={handleCourseChange}


              />
              {selectedCourse ? (
                <SelectInput
                  register={register}
                  error={errors?.semester_id?.message}
                  name="semester_id"
                  options={semesterState.semesters.map((semester: any) => ({
                    label: semester?.name,
                    value: semester?.id,
                  }))
                  }
                  onChange={handleSemesterChange}
                />
              ) : ""}

              {selectedCourse && selectedSemester ? (
                <SelectInput
                  register={register}
                  error={errors?.exam_id?.message}
                  name="exam_id"
                  options={examState.exams.map((exam: any) => ({
                    label: exam?.subject?.subject_name + " " + "(" + exam?.course?.course_name + ")" + " " + exam?.semester?.name,
                    value: exam?.id,
                  }))
                  }
                  onChange={handleExamChange}
                />
              ) : ""}

              {selectedCourse ? (
                <SelectInput
                  register={register}
                  error={errors?.student_id?.message}
                  name="student_id"
                  options={studentState.students.map((student: any) => ({
                    label: student?.user?.user_name,
                    value: student?.id,
                  }))
                  }
                  onChange={handleStudentChange}
                />
              ) : ""}

              <TextFields
                label="Marks"
                name="marks"
                type="number"
                register={register}
                placeholder='Enter Marks'
                error={errors?.marks?.message}
              />


              <SelectInput
                register={register}
                error={errors?.status?.message}
                name="status"
                options={[
                  {
                    label: "Pass",
                    value: "pass",
                  },
                  {
                    label: "Fail",
                    value: "fail",
                  },
                ]}
                onChange={handleStatusChange}
              />


            </ModalBody>
            <ModalFooter className="justify-end">
              <Buttons text="Cancel" type="submit" className="bg-gray-500"
                onClick={onCancel}
              />
              <Buttons text={` ${selectedExam ? `Update` : `Add`}`} type="submit" className="dashboardlink"

              />
            </ModalFooter>
          </form>
        </Modal>)
        : ""}
      {showDeleteModal ? (
        <DeleteModal>
          <button className="bg-red-500 text-white px-3 py-2 rounded-md" onClick={handleDelete}>Delete</button>
          <button className="bg-gray-500 text-white px-3 py-2 rounded-md" onClick={onCancelDeleteModal}>Cancel</button>
        </DeleteModal>
      ) : ""}
    </>
  )
}