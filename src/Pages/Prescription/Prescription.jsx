import React from 'react'
import { Col } from 'reactstrap'

function Prescription() {
  return (
    <div>
      <Col className='col-xl-6'>
        <div className='card'>
          <div className='card-header'>
            <h5>Prescription</h5>
          </div>
          <div className='card-body'>
            <div className='media'>
              <img className='img-40 img-fluid m-r-20' src={require('../../assets/images/user/7.jpg').default} alt='' />
              <div className='media-body'>
                <h6 className='f-w-600'>Dr.Emay Walter</h6>
                <p>General Physician</p>
              </div>
            </div>
            <div className='prescription'>
              <div className='media'>
                <div className='media-body'>
                  <h6 className='f-w-600'>Prescription</h6>
                  <p>Acetaminophen 500 mg, 325 mg, 250 mg, and 125 mg tablets, 125 mg tablets, 250 mg tablets, and 500 mg tablets daily</p>
                </div>
                </div>
                <div className='media'>
                  <div className='media-body'>
                    <h6 className='f-w-600'>Dosage</h6>
                    <p>1 tablet daily</p>
                  </div>
                </div>
                <div className='media'>
                    <div className='media-body'>
                        <h6 className='f-w-600'>Duration</h6>
                        <p>1 Month</p>
                    </div>
                </div>
                <div className='media'>
                    <div className='media-body'>
                        <h6 className='f-w-600'>Advice</h6>
                </div>
            </div>
        </div>
    </div>
</div>
      </Col>

    </div>
  )
}

export default Prescription
