import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { IoPerson } from 'react-icons/io5';
import { AiOutlineGlobal } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FaFlag, FaClinicMedical } from 'react-icons/fa';
import { getChartDataGlobalAdmin } from 'store/dashboard/actions';
import { getTranslate } from 'react-localize-redux';
import { Bar } from 'react-chartjs-2';
import { getCountryName } from 'utils/country';
import _ from 'lodash';

const GlobalAdminDashboard = () => {
  const localize = useSelector((state) => state.localize);
  const translate = getTranslate(localize);
  const dispatch = useDispatch();
  const globalAdminData = useSelector(state => state.dashboard.globalAdminData);
  const countries = useSelector(state => state.country.countries);
  const [totalGlobalAdmin, setTotalGlobalAdmin] = useState(0);
  const [totalCountryAdmin, setTotalCountryAdmin] = useState(0);
  const [totalClinicAdmin, setTotalClinicAdmin] = useState(0);
  const [totalTherapist, setTotalTherapist] = useState(0);
  const [countryAdminPerCountries, setCountryAdminPerCountries] = useState([]);
  const [clinicAdminPerCountries, setClinicAdminPerCountries] = useState([]);
  const [countryLabel, setCountryLabel] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const [clinicLabel, setClinicLabel] = useState([]);
  const [clinicData, setClinicData] = useState([]);

  useEffect(() => {
    dispatch(getChartDataGlobalAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (!_.isEmpty(globalAdminData)) {
      setTotalGlobalAdmin(globalAdminData.globalAdminTotal);
      setTotalCountryAdmin(globalAdminData.countryAdminTotal);
      setTotalClinicAdmin(globalAdminData.clinicAdminTotal);
      if (globalAdminData.countryAdminByCountry.length) {
        setCountryAdminPerCountries(globalAdminData.countryAdminByCountry);
      }
      if (globalAdminData.clinicAdminsByCountry.length) {
        setClinicAdminPerCountries(globalAdminData.clinicAdminsByCountry);
      }

      if (globalAdminData.therapistData.length) {
        setTotalTherapist(globalAdminData.therapistData.data.therapistTotal);
      }
    }
  }, [globalAdminData]);

  useEffect(() => {
    if (countryAdminPerCountries.length) {
      const countryLabel = [];
      const countryData = [];
      // eslint-disable-next-line
      { countryAdminPerCountries.map((countryAdminPerCountry) => (
        // eslint-disable-next-line
        countryLabel.push(getCountryName(countryAdminPerCountry.country_id, countries)),
        countryData.push(countryAdminPerCountry.total)
      )); }

      setCountryLabel(countryLabel);
      setCountryData(countryData);
    }

    if (clinicAdminPerCountries.length) {
      const clinicLabel = [];
      const clinicData = [];
      // eslint-disable-next-line
      { clinicAdminPerCountries.map((clinicAdminPerCountry) => (
        // eslint-disable-next-line
        clinicLabel.push(getCountryName(clinicAdminPerCountry.country_id, countries)),
        clinicData.push(clinicAdminPerCountry.total)
      )); }

      setClinicLabel(clinicLabel);
      setClinicData(clinicData);
    }
  }, [countryAdminPerCountries, clinicAdminPerCountries, countries]);

  const countryAdminPerCountryData = {
    labels: countryLabel,
    datasets: [
      {
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#06038D',
        borderWidth: 2,
        data: countryData
      }
    ]
  };

  const clinicAdminPerCountryData = {
    labels: clinicLabel,
    datasets: [
      {
        fill: false,
        lineTension: 0.5,
        backgroundColor: '#5BC2E7',
        borderWidth: 2,
        data: clinicData
      }
    ]
  };

  return (
    <>
      <Row className="top-card-container mt-5">
        <Col sm={5} md={4} lg={3}>
          <Card className="dashboard-top-card">
            <Card.Body>
              <Row>
                <Col sm={5} md={4} lg={3}>
                  <AiOutlineGlobal size={45} color="#0077C8"/>
                </Col>
                <Col sm={7} md={8} lg={9}>
                  <h6 className="card-text">{translate('common.total_global_admin')}</h6>
                  <h5 className="card-number">{ totalGlobalAdmin }</h5>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={5} md={4} lg={3}>
          <Card className="dashboard-top-card">
            <Card.Body>
              <Row>
                <Col sm={5} md={4} lg={3}>
                  <FaFlag size={45} color="#0077C8"/>
                </Col>
                <Col sm={7} md={8} lg={9}>
                  <h6 className="card-text">{translate('common.total_country_admin')}</h6>
                  <h5 className="card-number">{totalCountryAdmin}</h5>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={5} md={4} lg={3}>
          <Card className="dashboard-top-card">
            <Card.Body>
              <Row>
                <Col sm={5} md={4} lg={3}>
                  <FaClinicMedical size={45} color="#0077C8"/>
                </Col>
                <Col sm={7} md={8} lg={9}>
                  <h6 className="card-text">{translate('common.total_clinic_admin')}</h6>
                  <h5 className="card-number">{totalClinicAdmin}</h5>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={5} md={4} lg={3}>
          <Card className="dashboard-top-card">
            <Card.Body>
              <Row>
                <Col sm={5} md={4} lg={3}>
                  <IoPerson size={45} color="#0077C8"/>
                </Col>
                <Col sm={7} md={8} lg={9}>
                  <h6 className="card-text">{translate('common.total_therapist')}</h6>
                  <h5 className="card-number">{totalTherapist}</h5>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col sm={5} md={4} lg={6}>
          <Bar
            data={countryAdminPerCountryData}
            options={{
              title: {
                display: true,
                text: translate('common.country_admin_per_country'),
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              }
            }}
          />
        </Col>
        <Col sm={5} md={4} lg={6}>
          <Bar
            data={clinicAdminPerCountryData}
            options={{
              title: {
                display: true,
                text: translate('common.clinic_admin_per_country'),
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              }
            }}
          />
        </Col>
      </Row>
    </>
  );
};

GlobalAdminDashboard.propTypes = {
  translate: PropTypes.func
};

export default GlobalAdminDashboard;
