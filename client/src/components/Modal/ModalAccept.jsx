import Modal from './Modal';
import './modal.css'
import { deleteAvatar } from '../../http/avatarsAPI';
import { useContext } from 'react';
import { Context } from '../..';

const ModalAccept = ({modalAccept, setModalAccept}) => {
    const {user, avatars} = useContext(Context)

    const delAvatar = async (avatar) => {
        deleteAvatar(avatar.id, user.user['id']).then((data) => {
            avatars.setAvatars([...data]);
            setModalAccept({active: false});
        });
        user.setUser({...user.user, publications: user.user['publications'] - 1})
    }

    return (
        <Modal active={modalAccept.active}>
            <div className='accept'>
                <div style={{color: "#fff"}}>Удаление аватарки</div>
                <div className='acceptBtn'>
                    <button onClick={() => delAvatar(modalAccept.avatar)}>Удалить</button>
                    <button onClick={() => setModalAccept({active: false})}>Отмена</button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalAccept;