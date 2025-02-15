import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";
import './TeacherStyle.css'
import {useDispatch, useSelector} from "react-redux";
import actionCreator from "../_shared/helpers/actionCreator";
import action from "../student/redux/actions/studentActions";
import columns from "../_shared/json/studentColums.json";
import ReactTable from "../_shared/components/data-table/ReactTable";

const ViewTeacher = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const {username, name, email, aboutu, mobile, qualification, sex} = location.state?.teacher;

  useEffect(() => {
    dispatch(actionCreator(action.LOAD_ALL_STUDENTS));
  }, []);

  const {students} = useSelector((state) => state.studentReducer);

  return (
    <>
      <div className="row pt-30">
        <div className="col-xxl-9 col-lg-8">
          <div className="card-style mb-30">

            <div className="client-cover">
              <img src="https://demo.plainadmin.com/assets/images/clients/clients-cover.jpg" alt="cover-image"/>
              <div className="update-image">
                <input type="file"/>
                <label htmlFor=""><i className="lni lni-camera"></i> Edit Cover Photo
                </label>
              </div>
            </div>

            <div className="client-profile-photo">
              <div className="image">
                <img src="https://demo.plainadmin.com/assets/images/clients/client-profile.png" alt="profile"/>
                <div className="update-image">
                  <input type="file"/>
                  <label htmlFor=""><i className="lni lni-camera"></i></label>
                </div>
              </div>
              <div className="profile-meta text-center pt-25">
                <h5 className="text-bold mb-10">{name}</h5>
                <p className="text-sm">{qualification?.name}</p>
              </div>
            </div>

            <div className="client-info">
              <h5 className="text-bold mb-15">About Me</h5>
              <p className="text-sm mb-20">{aboutu}</p>
              <h5 className="text-bold mb-15">Email</h5>
              <p className="text-sm text-medium mb-20">{email}</p>
              <h5 className="text-bold mb-15">Mobile</h5>
              <p className="text-sm text-medium mb-20">{mobile}</p>
            </div>
          </div>
        </div>
        <div className="col-xxl-3 col-lg-4">
          <div className="row">
            <div className="col-sm-6 col-lg-12">
              <div className="icon-card mb-30">
                <div className="icon purple">
                  <i className="lni lni-checkmark"></i>
                </div>
                <div className="content">
                  <h6 className="mb-10">New Order</h6>
                  <h3 className="text-bold">30</h3>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-12">
              <div className="icon-card mb-30">
                <div className="icon success">
                  <i className="lni lni-checkmark"></i>
                </div>
                <div className="content">
                  <h6 className="mb-10">Completed Orders</h6>
                  <h3 className="text-bold">2K+</h3>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-12">
              <div className="icon-card mb-30">
                <div className="icon primary">
                  <i className="lni lni-checkmark"></i>
                </div>
                <div className="content">
                  <h6 className="mb-10">Cancelled Order</h6>
                  <h3 className="text-bold">755</h3>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-12">
              <div className="icon-card mb-30">
                <div className="icon orange">
                  <i className="lni lni-star-half"></i>
                </div>
                <div className="content">
                  <h6 className="mb-10">Positive Rating</h6>
                  <h3 className="text-bold">1.2K</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card-style clients-table-card mb-30">
            <ReactTable
              columns={columns}
              rows={students}
            />
          </div>
        </div>
      </div>
    </>
  )
};

export default ViewTeacher;
