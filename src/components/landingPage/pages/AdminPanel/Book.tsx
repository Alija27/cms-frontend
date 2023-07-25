import Layout from '../../../shared/dashboard/Layout'
import { TableLayout, Table, THead, TBody, TableActions } from "../../../shared/table/Table"
import Buttons from "../../../shared/buttons/Buttons"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import { useEffect, useState } from 'react'     
import { getAllBooks, createBook, updateBook, deleteBook } from '../../../../app/feature/Book/BookApi'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../shared/modals/Modal'
import TextFields from '../../../shared/inputs/TextFields'
import { set, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { FaEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { DeleteModal } from '../../../shared/modals/DeleteModal'


export const Books = () => {

  const dispatch = useAppDispatch();
  const bokState = useAppSelector((store) => store.BookSlice);

  //display all Books
  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);


  //display modal to add a new Book
  const [showAddModal, setShowAddModal] = useState(false);

  //select Book to edit
  const [selectedBook, setSelectedBook] = useState<any>(null);

  //delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onCancel = () => {
    setShowAddModal(false);
    setSelectedBook(null);
    reset();
  }


  //form data submit
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    mode: "onChange",
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required(),
        publication: yup.string().required(),
        quantity: yup.string().required(),
      })
    ),
  })

  useEffect(() => {
    if (selectedBook) {
      setValue("name", selectedBook?.name);
    setValue("publication", selectedBook?.publication);
    setValue ("quantity", selectedBook?.quantity);
    }
  }, [selectedBook, setValue]);
  const onsubmit = async (data: any) => {
    if (selectedBook) {
      await dispatch(updateBook({ data, id: selectedBook?.id })).then((res: any) => {
        if (res.payload.success) {
          reset();
          onCancel();
        }
      });
    }
    else {
      await dispatch(createBook(data)).then((res: any) => {
        if (res.payload.success) {
          reset();
          onCancel();
        }
      });
    }
  };

  
  
  const handleDelete = async () => {
    await dispatch(deleteBook(selectedBook?.id)).then((res: any) => {
      if (res.payload.success) {
        onCancelDeleteModal();
        reset();
        setSelectedBook(null);
      }
    });
  };
  const onCancelDeleteModal= () => {
    setShowDeleteModal(false);
    setSelectedBook(null);
  }

  return (
    <>
      <Layout>
        <div className="w-full">
          <TableLayout heading="Books"
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
                    <th>Publication</th>
                    <th>Quantity</th>
                    <th>Actions</th>

                  </tr>
                </THead>
                <TBody>
                  {bokState.books.map((book: any, index) => (
                    <tr key={book?.id}>
                      <td>{index + 1}</td>
                      <td>{book?.name}</td>
                      <td>{book?.publication}</td>
                      <td>{book?.quantity}</td>
                      <TableActions>
                        <div className="hover:text-blue-800">
                          <FaEdit size={20} onClick={() => {
                            setSelectedBook(book);
                            setShowAddModal(true);
                          }} />
                        </div>

                        <div className="hover:text-red-800">
                          <AiFillDelete size={20} onClick={() => {
                            setSelectedBook(book);
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
            {selectedBook ? "Edit Book" : "Add Book"}
          </ModalHeader>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onsubmit)} >
            <ModalBody>
              
              <TextFields
                register={register}
                error={errors?.name?.message}
                name="name"
                type="text"
                placeholder="Enter your name here"
                label="Name" />

              <TextFields
                register={register}
                error={errors?.publication?.message}
                name="publication"
                type="text"
                placeholder="Enter your publication here"
                label="Publication" />

                                 
                                  
                                   
              <TextFields
                register={register}
                error={errors?.quantity?.message}
                name="quantity"
                type="number"
                placeholder="Enter your quantity here"
                label="Quantity" />


            </ModalBody>
            <ModalFooter className="justify-end">
              <Buttons text="Cancel" type="submit" className="bg-gray-500"
                onClick={onCancel}
              />
              <Buttons text={` ${selectedBook ? `Update` : `Add`}`} type="submit" className="dashboardlink" />
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
