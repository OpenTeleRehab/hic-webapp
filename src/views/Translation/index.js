import React, { useEffect, useState } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { BsPlus } from 'react-icons/bs';
import { useKeycloak } from '@react-keycloak/web';
import PropTypes from 'prop-types';

import TranslationLabel from 'views/Translation/Label';
import Language from 'views/Translation/Language';
import CreateLanguage from 'views/Translation/Language/create';

import * as ROUTES from 'variables/routes';
import { USER_ROLES } from 'variables/user';

const VIEW_TRANSLATION = 'translation';
const VIEW_LANGUAGE = 'language';

const Translation = ({ translate }) => {
  const { keycloak } = useKeycloak();
  const { hash } = useLocation();
  const [view, setView] = useState(undefined);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState();

  useEffect(() => {
    if (hash.includes('#' + VIEW_LANGUAGE)) {
      setView(VIEW_LANGUAGE);
    } else {
      setView(VIEW_TRANSLATION);
    }
  }, [hash]);

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
        <h1>{translate('common.system_labels')}</h1>
        {view === VIEW_LANGUAGE && (
          <div className="d-flex">
            <div className="btn-toolbar mb-2 mb-md-0">
              <Button variant="primary" onClick={handleShow}>
                <BsPlus size={20} className="mr-1" />
                { translate(`${view}.new`) }
              </Button>
            </div>
          </div>
        )}
      </div>

      {show && view === VIEW_LANGUAGE && <CreateLanguage show={show} editId={editId} handleClose={handleClose} />}

      <Nav variant="tabs" activeKey={view} className="mb-3">
        { keycloak.hasRealmRole(USER_ROLES.MANAGE_TRANSLATION) && (
          <Nav.Item>
            <Nav.Link as={Link} to={ROUTES.ADMIN_TRANSLATIONS} eventKey={VIEW_TRANSLATION}>
              {translate('setting.translations')}
            </Nav.Link>
          </Nav.Item>
        )}
        { keycloak.hasRealmRole(USER_ROLES.MANAGE_LANGUAGE) && (
          <Nav.Item>
            <Nav.Link as={Link} to={ROUTES.ADMIN_TRANSLATIONS_LANGUAGE} eventKey={VIEW_LANGUAGE}>
              {translate('setting.languages')}
            </Nav.Link>
          </Nav.Item>
        )}
      </Nav>
      { keycloak.hasRealmRole(USER_ROLES.MANAGE_TRANSLATION) && view === VIEW_TRANSLATION && <TranslationLabel /> }
      { keycloak.hasRealmRole(USER_ROLES.MANAGE_LANGUAGE) && view === VIEW_LANGUAGE && <Language handleRowEdit={handleEdit} /> }
    </>
  );
};

Translation.propTypes = {
  translate: PropTypes.func
};

export default Translation;
