import Modal from './Modal';
import './modal.css'
import { deleteAvatar } from '../../http/avatarsAPI';
import { useContext } from 'react';
import { Context } from '../..';

const ModalAccept = ({update, setUpdate, oneAvatar, userId, modalActive, setModalActive}) => {
    const {avatar} = useContext(Context);
    const delAvatar = async (oneAvatar, userId) => {
        deleteAvatar(oneAvatar.id, userId).then((data) => {
            avatar.setUserAvatars(data);
            setModalActive(false);
            if (update) {
                setUpdate(false);
            } else {
                setUpdate(true);
            }
        });
    }

    return (
        <Modal active={modalActive} setActive={setModalActive}>
            <div className='accept'>
                <div>Удаление аватарки</div>
                <div className='acceptBtn'>
                    <button onClick={() => delAvatar(oneAvatar, userId)}>Удалить</button>
                    <button onClick={() => setModalActive(false)}>Отмена</button>
                </div>
            </div>
        </Modal>
    );
};

export default ModalAccept;