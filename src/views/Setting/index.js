import React, { useEffect, useState } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { BsPlus } from 'react-icons/bs';
import { useKeycloak } from '@react-keycloak/web';
import PropTypes from 'prop-types';

import Translation from 'views/Setting/Translation';
import TermAndCondition from 'views/Setting/TermAndCondition';
import PrivacyPolicy from 'views/Setting/PrivacyPolicy';
import Language from 'views/Setting/Language';
import StaticPage from 'views/Setting/StaticPage';

import * as ROUTES from 'variables/routes';
import { USER_ROLES } from 'variables/user';
import CreateLanguage from 'views/Setting/Language/create';
import CreateTermAndCondition from 'views/Setting/TermAndCondition/create';
import CreateStaticPage from 'views/Setting/StaticPage/create';
import CreatePrivacyPolicy from 'views/Setting/PrivacyPolicy/create';

const VIEW_TRANSLATION = 'translation';
const VIEW_TERM_AND_CONDITION = 'term_and_condition';
const VIEW_PRIVACY_POLICY = 'privacy_policy';
const VIEW_LANGUAGE = 'language';
const VIEW_STATIC_PAGE = 'static_page';

const Setting = ({ translate }) => {
  const { keycloak } = useKeycloak();
  const { hash } = useLocation();
  const [view, setView] = useState(undefined);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState();

  useEffect(() => {
    if (hash.includes('#' + VIEW_TRANSLATION)) {
      setView(VIEW_TRANSLATION);
    } else if (hash.includes('#' + VIEW_TERM_AND_CONDITION)) {
      setView(VIEW_TERM_AND_CONDITION);
    } else if (hash.includes('#' + VIEW_PRIVACY_POLICY)) {
      setView(VIEW_PRIVACY_POLICY);
    } else if (hash.includes('#' + VIEW_LANGUAGE)) {
      setView(VIEW_LANGUAGE);
    } else if (hash.includes('#' + VIEW_STATIC_PAGE)) {
      setView(VIEW_STATIC_PAGE);
    } else {
      setView(VIEW_LANGUAGE);
    }
  }, [hash, keycloak]);

  const handleShow = () => {
    setShow(true);
  };

  const handleEdit = (id) => {
    setEditId(id);
    setShow(true);
  };

  const handleClose = () => {
    setEditId('');
    setShow(false);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">
        <h1>{translate('setting')}</h1>
        {[VIEW_LANGUAGE, VIEW_TERM_AND_CONDITION, VIEW_PRIVACY_POLICY, VIEW_STATIC_PAGE].map(v => {
          if (v === view) {
            return (
              <div className="d-flex">
                <div key={v} className="btn-toolbar mb-2 mb-md-0">
                  <Button variant="primary" onClick={handleShow}>
                    <BsPlus size={20} className="mr-1" />
                    { translate(`${view}.new`) }
                  </Button>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      {show && view === VIEW_LANGUAGE && <CreateLanguage show={show} editId={editId} handleClose={handleClose} />}
      {show && view === VIEW_TERM_AND_CONDITION && <CreateTermAndCondition show={show} editId={editId} handleClose={handleClose} />}
      {show && view === VIEW_PRIVACY_POLICY && <CreatePrivacyPolicy show={show} editId={editId} handleClose={handleClose} />}
      {show && view === VIEW_STATIC_PAGE && <CreateStaticPage show={show} editId={editId} handleClose={handleClose} />}

      <Nav variant="tabs" activeKey={view} className="mb-3">
        { keycloak.hasRealmRole(USER_ROLES.MANAGE_LANGUAGE) && (
          <Nav.Item>
            <Nav.Link as={Link} to={ROUTES.SETTING_LANGUAGE} eventKey={VIEW_LANGUAGE}>
              {translate('setting.languages')}
            </Nav.Link>
          </Nav.Item>
        )}
        { keycloak.hasRealmRole(USER_ROLES.MANAGE_TRANSLATION) && (
          <Nav.Item>
            <Nav.Link as={Link} to={ROUTES.SETTING_TRANSLATIONS} eventKey={VIEW_TRANSLATION}>
              {translate('setting.translations')}
            </Nav.Link>
          </Nav.Item>
        )}
        { keycloak.hasRealmRole(USER_ROLES.MANAGE_TERM_CONDITION) && (
          <Nav.Item>
            <Nav.Link as={Link} to={ROUTES.SETTING_TERM_AND_CONDITION} eventKey={VIEW_TERM_AND_CONDITION}>
              {translate('setting.term_and_conditions')}
            </Nav.Link>
          </Nav.Item>
        )}
        { keycloak.hasRealmRole(USER_ROLES.MANAGE_PRIVACY_POLICY) && (
          <Nav.Item>
            <Nav.Link as={Link} to={ROUTES.SETTING_PRIVACY_POLICY} eventKey={VIEW_PRIVACY_POLICY}>
              {translate('setting.privacy_policy')}
            </Nav.Link>
          </Nav.Item>
        )}
        { keycloak.hasRealmRole(USER_ROLES.MANAGE_STATIC_PAGE) && (
          <Nav.Item>
            <Nav.Link as={Link} to={ROUTES.SETTING_STATIC_PAGE} eventKey={VIEW_STATIC_PAGE}>
              {translate('setting.static_page')}
            </Nav.Link>
          </Nav.Item>
        )}
      </Nav>

      { keycloak.hasRealmRole(USER_ROLES.MANAGE_LANGUAGE) && view === VIEW_LANGUAGE && <Language handleRowEdit={handleEdit} /> }
      { keycloak.hasRealmRole(USER_ROLES.MANAGE_TRANSLATION) && view === VIEW_TRANSLATION && <Translation /> }
      { keycloak.hasRealmRole(USER_ROLES.MANAGE_TERM_CONDITION) && view === VIEW_TERM_AND_CONDITION && <TermAndCondition handleRowEdit={handleEdit} /> }
      { keycloak.hasRealmRole(USER_ROLES.MANAGE_STATIC_PAGE) && view === VIEW_STATIC_PAGE && <StaticPage handleRowEdit={handleEdit} /> }
      { keycloak.hasRealmRole(USER_ROLES.MANAGE_PRIVACY_POLICY) && view === VIEW_PRIVACY_POLICY && <PrivacyPolicy handleRowEdit={handleEdit} /> }
    </>
  );
};

Setting.propTypes = {
  translate: PropTypes.func
};

export default Setting;
