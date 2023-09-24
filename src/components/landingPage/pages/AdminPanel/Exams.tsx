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
import { getAllExams, createExam, updateExam, deleteExam } from '../../../../app/feature/Exam/ExamApi'
import { SelectInput } from '../../../shared/inputs/SelectInput'
import { getAllCourses } from '../../../../app/feature/Course/CourseApi'
import { getAllSemesters } from '../../../../app/feature/Semester/SemesterApi'
import { getAllSubjects } from '../../../../app/feature/Subject/SubjectApi'
import { getAllTeachers } from '../../../../app/feature/Teacher/TeacherApi'





export const Exams = () => {

  const dispatch = useAppDispatch();
  const examState = useAppSelector((store) => store.ExamSlice);
  const semesterState = useAppSelector((store) => store.SemesterSlice);
  const courseState = useAppSelector((store) => store.CourseSlice);
  const subjectState = useAppSelector((store) => store.SubjectSlice);
  const teacherState = useAppSelector((store) => store.TeacherSlice);
  //select user
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  //display all Exames
  useEffect(() => {
    dispatch(getAllExams({ course_id: null, semester_id: null }));
    dispatch(getAllCourses(null));
    dispatch(getAllSemesters());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllSubjects(selectedCourse));
  }, [dispatch, selectedCourse]);

  useEffect(() => {
    dispatch(getAllTeachers());
  }, [dispatch]);



  //display modal to add a new Exam
  const [showAddModal, setShowAddModal] = useState(false);

  //select Exam to edit
  const [selectedExam, setSelectedExam] = useState<any>(null);



  //delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onCancel = () => {
    setShowAddModal(false);
    setSelectedExam(null);
    reset();
  }

  const onCancelDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedExam(null);
    reset();
  }
  //form data submit
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    mode: "onChange",
    resolver: yupResolver(
      yup.object().shape({
        course_id: yup.string().required("Course is required"),
        semester_id: yup.string().required("Semester is required"),
        subject_id: yup.string().required("Subject is required"),
        teacher_id: yup.string().required("Teacher is required"),
        date: yup.string().required("Date is required"),
        time: yup.string().required("Time is required"),
        duration: yup.string().required("Duration is required"),
        total_marks: yup.string().required("Total Marks is required"),
        pass_marks: yup.string().required("Pass Marks is required"),
        description: yup.string().required("Description is required"),
        exam_type: yup.string().required("Exam Type is required"),
      })
    ),
  })

  useEffect(() => {
    if (selectedExam) {
      setValue("course_id", selectedExam?.course_id);
      setValue("semester_id", selectedExam?.semester_id);
      setValue("subject_id", selectedExam?.subject_id);
      setValue("teacher_id", selectedExam?.teacher_id);
      setValue("date", selectedExam?.date);
      setValue("time", selectedExam?.time);
      setValue("duration", selectedExam?.duration);
      setValue("total_marks", selectedExam?.total_marks);
      setValue("pass_marks", selectedExam?.pass_marks);
      setValue("description", selectedExam?.description);
      setValue("exam_type", selectedExam?.exam_type);

    }
  }, [selectedExam, setValue]);
  const onsubmit = async (data: any) => {

    if (selectedExam) {
      await dispatch(updateExam({ data, id: selectedExam?.id })).then((res: any) => {
        if (res.payload.success) {
          reset();
          onCancel();

        }
      });
    }
    else {
      await dispatch(createExam(data)).then((res: any) => {
        console.log("here");
        if (res.payload.success) {
          console.log("here");
          reset();
          onCancel();

        }
      });
    }
  };

  const handleSubjectChange = (option: any, actionMeta: any) => {
    setValue("subject_id", option.value);

  }


  const handleCourseChange = (option: any, actionMeta: any) => {
    console.log(option.value);
    setSelectedCourse(option.value)
    setValue("course_id", option.value);
  }

  const handleSemesterChange = (option: any, actionMeta: any) => {
    setValue("semester_id", option.value);

  }

  const handleTeacherChange = (option: any, actionMeta: any) => {
    setValue("teacher_id", option.value);
  }

  const handleDelete = async () => {
    await dispatch(deleteExam(selectedExam?.id)).then((res: any) => {
      if (res.payload.success) {
        setShowDeleteModal(false);
        reset();
        setSelectedExam(null);

      }
    });
  };


  return (
    <>
      <Layout>
        <div className="w-full">
          <TableLayout heading="Exams"
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
                    <th>Course</th>
                    <th>Semester</th>
                    <th>Subject</th>
                    <th>Teacher</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Duration</th>
                    <th>Is Active</th>
                    <th>Total Marks</th>
                    <th>Pass Marks</th>
                    <th>Description</th>
                    <th>Exam Type</th>

                    <th>Actions</th>

                  </tr>
                </THead>
                <TBody>
                  {examState.exams.map((exam: any, index) => (
                    <tr key={exam?.id}>
                      <td>{index + 1}</td>
                      <td>{exam?.course?.course_name}</td>
                      <td>{exam?.semester?.name}</td>
                      <td>{exam?.subject?.subject_name}</td>
                      <td>{exam?.teacher?.user_name}</td>
                      <td>{exam?.date}</td>
                      <td>{exam?.time}</td>
                      <td>{exam?.duration}</td>
                      <td>{exam?.is_active}</td>
                      <td>{exam?.total_marks}</td>
                      <td>{exam?.pass_marks}</td>
                      <td>{exam?.description}</td>
                      <td>{exam?.exam_type}</td>
                      <TableActions>
                        <div className="hover:text-blue-800">
                          <FaEdit size={20} onClick={() => {
                            setSelectedExam(exam);
                            setShowAddModal(true);
                          }} />
                        </div>

                        <div className="hover:text-red-800">
                          <AiFillDelete size={20} onClick={() => {
                            setSelectedExam(exam);
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
            {selectedExam ? "Edit Exam" : "Add Exam"}
          </ModalHeader>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onsubmit)} >
            <ModalBody>
              <SelectInput
                text='Course'
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
              <SelectInput
                text='Semester'
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

              {(selectedCourse && setSelectedCourse.length > 0) &&
                <SelectInput
                  text='Subject'
                  register={register}
                  error={errors?.subject_id?.message}
                  name="subject_id"
                  options={subjectState.subjects.map((subject: any) => ({
                    label: subject?.subject_name,
                    value: subject?.id,
                  }))
                  }
                  onChange={handleSubjectChange}


                />




              }




              <SelectInput
               text='Teacher'
                register={register}
                error={errors?.teacher_id?.message}
                name="teacher_id"
                options={teacherState.teachers.map((teacher: any) => ({
                  label: teacher?.user_name,
                  value: teacher?.id,
                }))
                }
                onChange={handleTeacherChange}
                placeholder='Teacher'

              />


              <TextFields
                register={register}
                error={errors?.date?.message}
                name="date"
                placeholder="Date"
                label="Date"
                type="date"
              />



              <TextFields
                register={register}
                error={errors?.time?.message}
                name="time"
                placeholder="Time"
                label="Time"

                type='time'
              />

              <TextFields
                register={register}
                error={errors?.duration?.message}
                name="duration"
                placeholder="Duration"
                label="Duration"
                type="text"
              />

              <TextFields
                register={register}
                error={errors?.total_marks?.message}
                name="total_marks"
                placeholder="Total Marks"
                label="Total Marks"
                type="number"
              />

              <TextFields
                register={register}
                error={errors?.pass_marks?.message}
                name="pass_marks"
                placeholder="Pass Marks"
                label="Pass Marks"
                type="number"
              />

              <TextFields
                register={register}
                error={errors?.description?.message}
                name="description"
                placeholder="Description"
                label="Description"
                type="text"
              />

              <TextFields
                register={register}
                error={errors?.exam_type?.message}
                name="exam_type"
                placeholder="Exam Type"
                label="Exam Type"
                type="text"
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


