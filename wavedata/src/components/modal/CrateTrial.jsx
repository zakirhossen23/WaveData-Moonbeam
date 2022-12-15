import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CurrencyDollarIcon } from "@heroicons/react/solid";
import Cookies from 'js-cookie'

export default function CreateTrialModal({
    show,
    onHide

}) {

    

    async function CreateTrial(e) {
        e.preventDefault();
        const { title, description, image, createBTN, budget } = e.target;
        var notificationSuccess = e.target.children[0].firstChild;
        var notificationError = e.target.children[0].lastChild;
        createBTN.children[0].classList.remove("hidden")
        createBTN.children[1].innerText = ""
        createBTN.disabled = true;
        try {
            let current = new Date();
            let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
            let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
            let dateTime = cDate + ' ' + cTime;

            await window.contract.CreateTrial(Number(Cookies.get("userid")),image.value,title.value,description.value, 0,0,parseInt(budget.value),dateTime).send({
                from:window.ethereum.selectedAddress,
                gasPrice: 100_000_000,
                gas: 6_000_000,
            });
           
            notificationSuccess.style.display = "block";
            createBTN.children[0].classList.add("hidden")
            createBTN.children[1].innerText = "Create Trial"
            title.value = "";
            description.value = "";
            image.value = "";
            budget.value = 0;
            createBTN.disabled = false;
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
        createBTN.children[0].classList.add("hidden")
        createBTN.children[1].innerText = "Create Trial";
        createBTN.disabled = false;
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header  >
                <Modal.Title id="contained-modal-title-vcenter">
                    Create Trial
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Form onSubmit={CreateTrial}>
                    <Form.Group className="mb-3 grid" controlId="formGroupName">
                        <div id='notificationSuccess' name="notificationSuccess" style={{ display: 'none' }} className="mt-4 text-center bg-gray-200 relative text-gray-500 py-3 px-3 rounded-lg">
                            Success!
                        </div>
                        <div id='notificationError' name="notificationError" style={{ display: 'none' }} className="mt-4 text-center bg-red-200 relative text-red-600 py-3 px-3 rounded-lg">
                            Error! Please try again!
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3 grid" controlId="formGroupName">
                        <Form.Label>Title</Form.Label>
                        <input required name="title" placeholder="Title" id="title" className="border rounded pt-2 pb-2 border-gray-400 pl-4 pr-4" />
                    </Form.Group>
                    <Form.Group className="mb-3 grid" controlId="formGroupName">
                        <Form.Label>Description</Form.Label>
                        <textarea required name="description" placeholder="Description" id="description" className="border rounded pt-2 pb-2 border-gray-400 pl-4 pr-4" />
                    </Form.Group>
                    <Form.Group className="mb-3 grid" controlId="formGroupName">
                        <Form.Label>Image</Form.Label>
                        <input required name="image" placeholder="Image link" id="image" className="border rounded pt-2 pb-2 border-gray-400 pl-4 pr-4" />
                    </Form.Group>
                    <Form.Group className="mb-3 grid" controlId="formGroupName">
                        <Form.Label>Budget</Form.Label>
                        <div className="input-group">
                            <span className="input-group-addon text-sm pt-2 pb-2 pl-3 pr-3 font-normal -mr-1 leading-none text-gray-700 text-center bg-gray-200 border-gray-400 border rounded">
                                <CurrencyDollarIcon className="w-5 h-5 text-gray-500" />
                            </span>
                            <input required name="budget" placeholder="Budget" id="budget" type='number' className="w-24 text-black pr-2 border-gray-400 border pl-2" />
                        </div>
                    </Form.Group>
                    <div className="d-grid">
                        <Button name="createBTN" type='submit' style={{ 'display': 'flex' }} className='w-[128px] h-12 flex justify-center items-center' variant='outline-dark' >
                            <i id='LoadingICON' name='LoadingICON' className="select-none block w-12 m-0 fa fa-circle-o-notch fa-spin hidden"></i>
                            <span id='buttonText'>Create Trial</span>
                        </Button>
                    </div>
                </Form>
            </Modal.Body>

        </Modal>

    );
}