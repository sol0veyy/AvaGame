import React from 'react';
import Modal from './Modal';
import './modal.css';
import { deleteAvatar } from '../../http/avatarsAPI';
import { useContext } from 'react';
import { Context } from '../..';

interface IModalAccept {
    modalAccept: {
        active: boolean;
        avatar: object;
    };
    setModalAccept: React.Dispatch<React.SetStateAction<{
        active: boolean;
        avatar: object;
    }>>;
}

const ModalAccept = ({modalAccept, setModalAccept}: IModalAccept) => {
    const {user, avatars} = useContext(Context);

    const delAvatar = async (avatar) => {
        deleteAvatar(avatar.id, user.id)
            .then((data) => {
                avatars.setUserAvatars([...data]);
                user.setUser({...user, publications: user.publications - 1});
                
                setModalAccept({...modalAccept, active: false});
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <Modal active={modalAccept.active}>
            <div>
                <div className='text-center mb-3'>Удаление аватарки</div>
                <div className='d-flex gap-3'>
                    <button className='btn btn-outline-secondary' onClick={() => setModalAccept({...modalAccept, active: false})}>Отмена</button>
                    <button className='btn btn-danger' onClick={() => delAvatar(modalAccept.avatar)}>Удалить</button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalAccept;