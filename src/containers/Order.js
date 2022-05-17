import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateOrder } from '../actions/'
import Main from '../components/MainComponent'
import { Card } from '../components/UI/Card'
import './Order.css'

/**
* @author
* @function Order
**/

export const Order = (props) => {
  const order = useSelector(state => state.order);
  const [type, setType] = useState('');
  const dispatch = useDispatch();

  const onOrderUpdate = (orderID) => {
    const payload = {
      orderID: orderID,
      type
    };

    dispatch(updateOrder(payload))
  }

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  return (
    <Main sidebar>
      {order.orders.map((ele, index) => (
        <Card
          style={{
            margin: "10px 0",
          }}
          key={index}
          headerLeft={ele._id}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "50px 50px",
              alignItems: "center",
            }}
          >
            <div>
              <div className="title">Items</div>
              {ele.items.map((item, index) => (
                <div className="value" key={index}>
                  {item.productID.name}
                </div>
              ))}
            </div>
            <div>
              <span className="title">Total Price</span>
              <br />
              <span className="value">{ele.totalAmount}</span>
            </div>
            <div>
              <span className="title">Payment Type</span> <br />
              <span className="value">{ele.paymentType}</span>
            </div>
            <div>
              <span className="title">Payment Status</span> <br />
              <span className="value">{ele.paymentStatus}</span>
            </div>
          </div>
          <div
            style={{
              boxSizing: "border-box",
              padding: "100px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="orderTrack">
              {ele.orderStatus.map((status) => (
                <div
                  className={`orderStatus ${status.isCompleted ? "active" : ""
                    }`}
                >
                  <div
                    className={`point ${status.isCompleted ? "active" : ""}`}
                  ></div>
                  <div className="orderInfo">
                    <div className="status">{status.type}</div>
                    <div className="date">{formatDate(status.date)}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* select input to apply order action */}

            {
              ele.orderStatus[3].isCompleted ?
                null :
                <>
                  <div
                    style={{
                      padding: "0 50px",
                      boxSizing: "border-box",
                    }}
                  >
                    <select onChange={(e) => setType(e.target.value)}>
                      <option value=''>select status</option>
                      {
                        ele.orderStatus.map((status) => {
                          return <>
                            {
                              !status.isCompleted ?
                                <option key={status.type} value={status.type}>
                                  {status.type}
                                </option> :
                                null
                            }
                          </>
                        })
                      }
                    </select>
                  </div>
                  <div
                    style={{
                      padding: "0 50px",
                      boxSizing: "border-box",
                    }}
                  >
                    <button onClick={() => onOrderUpdate(ele._id)}>Confirm</button>
                  </div>
                </>
            }
          </div>
        </Card>
      ))
      }
    </Main >
  )

}