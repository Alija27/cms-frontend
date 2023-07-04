import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { FaEdit, FaEye, FaCross } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { DeleteModal } from '../../../shared/modals/DeleteModal'
import Buttons from '../../../shared/buttons/Buttons'  
import { RxCross2 } from 'react-icons/rx'
import Layout from '../../../shared/dashboard/Layout'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../shared/modals/Modal'
import TextFields from '../../../shared/inputs/TextFields'
import { TableLayout, Table, THead, TBody, TableActions } from "../../../shared/table/Table"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { useEffect, useState } from 'react'
import { getAllSemesters,createSemester,deleteSemester } from '../../../../app/feature/Semester/SemesterApi'
import { HeaderModal, ViewModal } from '../../../shared/modals/ViewModal'

const Semsters = () => {
    const dispatch = useAppDispatch();
    const SemesterState = useAppSelector((store) => store.SemesterSlice);

    //display all semesters
    useEffect(() => {
        dispatch(getAllSemesters());
    }, [dispatch]);

    //display modal to add a new semester
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const[selectedSemester,setSelectedSemester]=useState<any>(null);
    const[showViewModal,setShowViewModal]=useState(false);
    const {register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        mode: "onChange",
        resolver: yupResolver(
            yup.object().shape({
                name: yup.string().required(),
            })
            ),
    })

    useEffect(()=>{
      if(selectedSemester){
        setValue("name",selectedSemester?.name)
      }
    },[selectedSemester,setValue])

    const onsubmit = async (data: any) => {
        if (selectedSemester) {
            await dispatch(createSemester({ data, id: selectedSemester?.id })).then((res: any) => {
                if (res.payload.success) {
                    setShowAddModal(false);
                    setSelectedSemester(null);
                    reset();
                }
            });
            
        await dispatch(createSemester(data)).then((res: any) => {
            if (res.payload.success) {
                setShowAddModal(false);
                reset();
            }
        });
    }
}


   const onCancel = () => {
        setShowAddModal(false);
        setSelectedSemester(null);

        reset();
    }

    const onCancelViewModal =()=>{
        setShowViewModal(false);
        setSelectedSemester(null);
    }

    const onCancelDeleteModal =()=>{
        setShowDeleteModal(false);
        setSelectedSemester(null);
    }

    

    const handleDelete = async () => {
      console.log("selected", selectedSemester);
      await dispatch(deleteSemester(selectedSemester?.id)).then((res: any) => {
        console.log(res);
          if (res.payload.success) {
              setShowDeleteModal(false);
              setSelectedSemester(null);
          }
      });
    }


  return (
    <>
    <Layout>
        <div className="w-full">
          <TableLayout heading="Semesters"
            rightheading={<Buttons
              text="Add New"
              type="button"
              className="dashboardlink"
                onClick={() => {
                    setShowAddModal(true);
                }
                }

            />}>
            <div >
              <Table >
                <THead>
                  <tr>
                    <th>SN</th>
                    <th>Name</th>
                    <th>Actions</th>

                  </tr>
                </THead>
                <TBody>
                  {SemesterState.semesters.map((semester: any, index) => (
                    <tr key={semester?.id}>
                      <td>{index + 1}</td>
                      <td>{semester?.name}</td>
                      <TableActions>
                         <div className="hover:text-green-800">
                          <FaEye size={20} onClick={() => {
                            setSelectedSemester(semester)
                            setShowViewModal(true)
                          } }/>
                            </div>
                        <div className="hover:text-blue-800">
                          <FaEdit size={20} onClick={() => {
                            {setSelectedSemester(semester)}
                            setShowAddModal(true);
                          }} />
                        </div>

                        <div className="hover:text-red-800">
                          <AiFillDelete size={20} onClick={() => {
                            setSelectedSemester(semester)
                            setShowDeleteModal(true)
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
            {selectedSemester ? "Edit Semester": " Add semesters"}
          </ModalHeader>
          <form className="flex flex-col space-y-4"   onSubmit={handleSubmit(onsubmit)} >
            <ModalBody>
              <TextFields
                register={register}
                error={errors?.name?.message}
                name="name"
                type="text"
                placeholder="Enter semester name here"
                label="Name" />
            </ModalBody>
            <ModalFooter className="justify-end">
              <Buttons text="Cancel" type="submit" className="bg-gray-500"
                onClick={() => {onCancel()}}
              />
              <Buttons text={`${selectedSemester ? "Edit":"Add"}`} type="submit" className="dashboardlink" />
            </ModalFooter>
          </form>
        </Modal>)
        : ""}
      {showDeleteModal ? (
        <DeleteModal>
          <button className="bg-red-500 text-white px-3 py-2 rounded-md" onClick={handleDelete}>Delete</button>
          <button className="bg-gray-500 text-white px-3 py-2 rounded-md" onClick={onCancelDeleteModal} >Cancel</button>
        </DeleteModal>
      ) : ""}

      {showViewModal ? (
       <div>
        <ViewModal>
          <HeaderModal heading="Semester Details">
            <RxCross2 size={20} onClick={() => {
              onCancelViewModal();
            }} />

          </HeaderModal>
          <div className="flex flex-col space-y-4">
            <div className="mt-1">
              <span className="font-semibold mr-1">Name:</span>
              <span>{selectedSemester?.name}</span>
            </div>
          </div>
      </ViewModal>
   </div>
      ):""}
      
    </>
  )
}

export default Semsters