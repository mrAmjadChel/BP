import { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios"
import Swal from "sweetalert2"

const FormComponent = () => {
    const [state,setState] = useState({
        title:"",
        content:"",
        author:""
    })
    const {title,content,author} = state

    //กำหนดค่า state
    const inputValue = name => event => {
        console.log(name,"=",event.target.value)
        setState({...state,[name]:event.target.value});
    }

    const submitForm = (e) => {
        e.preventDefault();
        //console.table({title,content,author})
        axios
        .post(`${process.env.REACT_APP_API}/create`,{title,content,author})
        .then(response => {
            Swal.fire(
                'แจ้งเตือน',
                'บันทึกข้อมูลเรียบร้อย',
                'success'
              )
            setState({...state,title:"",content:"",author:""})
        })
        .catch(err => {
            Swal.fire(
                'แจ้งเตือน',
                err.response.data.error,
                'error'
              )
        })
    }

    return(
        <div className="container p-5">
            <NavbarComponent/>
            <h1>เขียนบทความ</h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>ชื่อบทความ</label>
                    <input type="text" className="form-control" 
                        value={title} 
                        onChange={inputValue("title")}
                    />
                </div>
                <div className="form-group">
                    <label>รายละเอียด</label>
                    <textarea className="form-control" 
                        value={content}
                        onChange={inputValue("content")}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>ชื่อผู้แต่ง</label>
                    <input type="text" className="form-control" 
                        value={author} 
                        onChange={inputValue("author")}
                    />
                </div>
                <br/>
                <input type="submit" value="บันทึก" className="btn btn-primary" />
            </form>
        </div>
    );
}

export default FormComponent;