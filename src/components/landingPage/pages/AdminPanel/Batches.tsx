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
import { getAllBatches, createBatch, updateBatch, deleteBatch } from '../../../../app/feature/Batch/BatchApi'




export const Batches = () => {

  const dispatch = useAppDispatch();
  const batchState = useAppSelector((store) => store.BatchSlice);

  //display all Batches
  useEffect(() => {
    dispatch(getAllBatches());
  }, [dispatch]);


  //display modal to add a new Batch
  const [showAddModal, setShowAddModal] = useState(false);

  //select Batch to edit
  const [selectedBatch, setSelectedBatch] = useState<any>(null);

  //delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onCancel = () => {
    setShowAddModal(false);
    setSelectedBatch(null);
    reset();
  }


  //form data submit
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    mode: "onChange",
    resolver: yupResolver(
      yup.object().shape({
        year: yup.string().required(),
      })
    ),
  })

  useEffect(() => {
    if (selectedBatch) {
      setValue("year", selectedBatch?.year);
    }
  }, [selectedBatch, setValue]);
  const onsubmit = async (data: any) => {
    if (selectedBatch) {
      await dispatch(updateBatch({ data, id: selectedBatch?.id })).then((res: any) => {
        if (res.payload.success) {
          reset();
          onCancel();
        }
      });
    }
    else {
      await dispatch(createBatch(data)).then((res: any) => {
        if (res.payload.success) {
          reset();
          onCancel();
          getAllBatches();
        }
      });
    }
  };

  
  const handleDelete = async () => {
    await dispatch(deleteBatch(selectedBatch?.id)).then((res: any) => {
      if (res.payload.success) {
        onCancelDeleteModal();
        reset();
        setSelectedBatch(null);
      }
    });
  };
  const onCancelDeleteModal= () => {
    setShowDeleteModal(false);
    setSelectedBatch(null);
    reset();
  }

  return (
    <>
      <Layout>
        <div className="w-full">
          <TableLayout heading="Batches"
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
                    <th>Year</th>
                    <th>Actions</th>

                  </tr>
                </THead>
                <TBody>
                  {batchState.batches.map((batch: any, index) => (
                    <tr key={batch?.id}>
                      <td>{index + 1}</td>
                      <td>{batch?.year}</td>
                      <TableActions>
                        <div className="hover:text-blue-800">
                          <FaEdit size={20} onClick={() => {
                            setSelectedBatch(batch);
                            setShowAddModal(true);
                          }} />
                        </div>

                        <div className="hover:text-red-800">
                          <AiFillDelete size={20} onClick={() => {
                            setSelectedBatch(batch);
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
            {selectedBatch ? "Edit Batch" : "Add Batch"}
          </ModalHeader>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onsubmit)} >
            <ModalBody>
              
              <TextFields
                register={register}
                error={errors?.year?.message}
                name="year"
                type="text"
                placeholder="Enter year here"
                label="Year" />


            </ModalBody>
            <ModalFooter className="justify-end">
              <Buttons text="Cancel" type="submit" className="bg-gray-500"
                onClick={onCancel}
              />
              <Buttons text={` ${selectedBatch ? `Update` : `Add`}`} type="submit" className="dashboardlink" />
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
