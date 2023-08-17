import React from 'react'
import { get, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { FaEdit } from 'react-icons/fa'
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
import { getAllBookTransactions, createBookTransaction, deleteBookTransaction, updateBookTransaction, updateStatus } from '../../../../app/feature/BookTransaction/BookTransactionApi'
import { HeaderModal, ViewModal } from '../../../shared/modals/ViewModal'

import { SelectInput } from '../../../shared/inputs/SelectInput'

import { getAllBooks } from '../../../../app/feature/Book/BookApi'
import { getAllUsers } from '../../../../app/feature/User/UserApi'
import Select from 'react-select/dist/declarations/src/Select'

const BookTransaction = () => {
    const dispatch = useAppDispatch();
    const bookTransactionState = useAppSelector((store) => store.BookTransactionSlice);
    const bookState = useAppSelector((store) => store.BookSlice);
    const userState = useAppSelector((store) => store.UserSlice);


    const generateBookLabel = (book: any) => {
        const courseNames = book.course.map((course: any) => course.course_name).join(", ");
        return `${book.name} (${courseNames})`;
    };

    useEffect(() => {

        dispatch(getAllBooks());
    }, [dispatch]);
    useEffect(() => {
        dispatch(getAllUsers({role:null}));
    }, [dispatch]);
    //display all booktransactions
    useEffect(() => {

        dispatch(getAllBookTransactions());

    }, [dispatch]);





    //display modal to add a new booktransaction
    const [showAddModal, setShowAddModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBookTransaction, setSelectedBookTransaction] = useState<any>(null);

    const [showViewModal, setShowViewModal] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        mode: "onChange",
        resolver: yupResolver(
            yup.object().shape({
                book_id: yup.string().required(),
                book_code: yup.string().required(),
                user_id: yup.string().required(),
                issue_date: yup.string().required(),
                return_date: yup.string().nullable(),
                status: yup.string().nullable(),


            })
        ),
    })



    useEffect(() => {

        if (selectedBookTransaction) {
            setValue("book_id", selectedBookTransaction.book_id);
            setValue("book_code", selectedBookTransaction.book_code);
            setValue("user_id", selectedBookTransaction.user_id);
            setValue("issue_date", selectedBookTransaction.issue_date);
            setValue("return_date", selectedBookTransaction.return_date);
            setValue("status", selectedBookTransaction.status);
        }
    }, [selectedBookTransaction, setValue])


    const handleBookChange = (e: any) => {
        console.log(e);
        setValue("book_id", e.value);
    }

    const handleUserChange = (e: any) => {
        console.log(e);
        setValue("user_id", e.value);
    }


    const onsubmit = async (data: any) => {
        console.log(data);
        if (selectedBookTransaction) {
            await dispatch(updateBookTransaction({ data, id: selectedBookTransaction?.id })).then((res: any) => {
                if (res.payload.success) {
                    setShowAddModal(false);
                    setSelectedBookTransaction(null);

                    reset();
                }
            });
        } else {
            await dispatch(createBookTransaction(data)).then((res: any) => {
                if (res.payload.success) {
                    setShowAddModal(false);

                    reset();
                    getAllBookTransactions();
                }
            });
        }
    }



    const bookTransactionStatus = [{ value: "issued", label: "Issued" }, { value: "returned", label: "Returned" }]
    const handleStatusChange = (e: any, id: any) => {
        console.log(e);
        dispatch(updateStatus({ data: { status: e.target.value }, id }))
    }
    const onCancel = () => {
        setShowAddModal(false);
        setSelectedBookTransaction(null);
        reset();
    }

    const onCancelDeleteModal = () => {
        setShowDeleteModal(false);
    }

    const handleDelete = async () => {
        console.log("delete");
        console.log(selectedBookTransaction);
        dispatch(deleteBookTransaction(selectedBookTransaction?.id)).then((res: any) => {
            if (res.payload.success) {
                setShowDeleteModal(false);
                setSelectedBookTransaction(null);
            }
        })

    }


    const onCancelViewModal = () => {
        setShowViewModal(false);
        setSelectedBookTransaction(null);
    }

    return (
        <>
            <Layout>
                <div className="w-full">
                    <TableLayout heading="BookTransactions"
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
                                        <th>Book</th>
                                        <th>Issued BY</th>
                                        <th>Issued Date</th>
                                        <th>Return Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>

                                    </tr>
                                </THead>
                                <TBody>
                                    {bookTransactionState.bookTransactions.map((bookTransaction: any, index) => (
                                        <tr key={bookTransaction?.id}>
                                            <td>{index + 1}</td>
                                            <td>{bookTransaction?.book_name}</td>
                                            <td>{bookTransaction?.user.user_name}</td>
                                            <td>{bookTransaction?.issue_date}</td>
                                            <td>{bookTransaction?.return_date}</td>
                                            <td>
                                            {/* {
                                                bookTransaction?.status===" issued"? ( */}
                                            
                                                <select
                                                    name="status"
                                                    className="border border-gray-300 rounded-md w-full px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                                                    onChange={(e: any) => handleStatusChange(e, bookTransaction.id)}
                                                    value={bookTransaction.status}
                                                >
                                                    
                                                    
                                                    {bookTransactionStatus.map((status: any) => (
                                                        <option key={status.value} value={status.value} 
                                                        
                                                        >
                                                           
                                                            {status.label}
                                                        </option>
                                                    ))}
                                                    
                                                </select>
                                               {/*  ) : (
                                                   "Returned"
                                                )
                                            } */}




                                                {/* { showStatusModal ? (
                                                <div>
                                                    <ViewModal>
                                                        <HeaderModal heading="Change Book Transaction Status">
                                                            <RxCross2 size={20} onClick={() => {
                                                                setShowStatusModal(false);
                                                            }} />

                                                        </HeaderModal>
                                                        <div className="flex flex-col space-y-4">
                                                            <div className="mt-1">
                                                                <SelectInput
                                                                    register={register}
                                                                    error={errors.status?.message}
                                                                    name="status"
                                                                    options={bookTransactionStatus.map((status: any) => ({
                                                                        value: status.value,
                                                                        label: status.label
                                                                    }))
                                                                    }
                                                                    defaultValue={bookTransaction?.status}

                                                                    onChange={(e: any) => handleStatusChange(e, bookTransaction.id)}

                                                                />

                                                            </div>
                                                        </div>
                                                    </ViewModal>
                                                </div>
                                            ):""} */}

                                                {/*  <SelectInput
                                                    register={register}
                                                    error={errors.status?.message}
                                                    name="status"
                                                    options={bookTransactionStatus.map((status: any) => ({
                                                        value: status.value,
                                                        label: status.label
                                                    }))
                                                    }
                                                    defaultValue={bookTransaction.status}

                                                    onChange={(e:any)=>handleStatusChange(e, bookTransaction.id)}
                                
                                                /> */}


                                            </td>
                                            <TableActions>
                                                {/* <div className="hover:text-green-800">
                                                    <FaEye size={20} onClick={() => {
                                                        setSelectedBookTransaction(bookTransaction)
                                                        setShowViewModal(true)
                                                    }} />
                                                </div> */}
                                                <div className="hover:text-blue-800">
                                                    <FaEdit size={20} onClick={() => {
                                                        { setSelectedBookTransaction(bookTransaction) }
                                                        setShowAddModal(true);
                                                    }} />
                                                </div>

                                                <div className="hover:text-red-800">
                                                    <AiFillDelete size={20} onClick={() => {
                                                        setSelectedBookTransaction(bookTransaction)
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
                        {selectedBookTransaction ? "Edit BookTransaction" : " Add BookTransactions"}
                    </ModalHeader>
                    <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onsubmit)} >
                        <ModalBody>

                            <SelectInput
                                register={register}
                                error={errors.book_id?.message}
                                name="book_id"
                                options={bookState.books.map((book: any) => ({
                                    value: book.id,
                                    label: generateBookLabel(book)
                                }))}
                                onChange={handleBookChange}
                            /* defaultValue={selectedBookTransaction?selectedBookTransaction?. book?.map((book: any) => ({
                               value: book.id,
                               label: book.name
                           })) : []} */


                            />
                            <SelectInput
                                register={register}
                                error={errors.user_id?.message}
                                name="user_id"

                                options={userState.getAllUsers.users.map((user: any) => ({
                                    value: user.id,
                                    label: user.user_name
                                }))}
                                   defaultValue={selectedBookTransaction? selectedBookTransaction?.user?.map((user: any) => ({
                                      value: user.id,
                                      label: user.user_name
                                  })) : [] }   

                                onChange={handleUserChange}
                            />

                            <TextFields
                                register={register}
                                error={errors.issue_date?.message}
                                name="issue_date"
                                type="date"
                                placeholder="Enter  Issued Date here"
                                label="Issue Date" />

                            <TextFields
                                register={register}
                                error={errors.book_code?.message}
                                name="book_code"
                                type="text"
                                placeholder="Enter  Book Code here"
                                label="Book Code" />


                           



                        </ModalBody>
                        <ModalFooter className="justify-end">
                            <Buttons text="Cancel" type="submit" className="bg-gray-500"
                                onClick={() => { onCancel() }}
                            />
                            <Buttons text={`${selectedBookTransaction ? "Edit" : "Add"}`} type="submit" className="dashboardlink" onClick={() => { "clicked" }} />
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
                        <HeaderModal heading="BookTransaction Details">
                            <RxCross2 size={20} onClick={() => {
                                onCancelViewModal();
                            }} />

                        </HeaderModal>
                        <div className="flex flex-col space-y-4">
                            <div className="mt-1">
                                <label className="block text-gray-600">Name</label>
                                <p className="text-gray-900">{selectedBookTransaction?.name}</p>

                            </div>
                        </div>
                    </ViewModal>
                </div>
            ) : ""}



        </>
    )
}

export default BookTransaction