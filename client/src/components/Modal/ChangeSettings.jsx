import React, { useState } from 'react';
import Modal from "./Modal"
import { changeSettings } from '../../http/userAPI';

const ChangeSettings = ({ infoUser, modalActive, setModalActive }) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [file, setFile] = useState(null);
    const [isFile, setIsFile] = useState(false);
    const [error, setError] = useState('')

    const selectFile = (e) => {
        setFile(e.target.files[0]);
        setIsFile(true);
    }

    const startChange = async () => {
        try {
            const formData = new FormData();
            formData.append('isImg', isFile);
            formData.append('userId', `${infoUser.id}`); 
            formData.append('img', file)
            formData.append('login', login);
            formData.append('password', password);
            formData.append('email', email);
            await changeSettings(formData).then(data => setModalActive(false));
            setLogin("");
            setPassword("");
            setEmail("");
            setIsFile(false);
        } catch (e) {
            setError(e.response.data.message);
        }
    }

    return (
        <Modal active={modalActive} setActive={setModalActive}>
            <form className="formСhangeSettings">
                <label>
                    <div className="newImgBlock">
                        <h2>Новая аватарка</h2>
                        <input 
                            type="file" 
                            onChange={selectFile} 
                        />
                    </div>
                </label>
                <label>
                    <input
                        type="text" 
                        placeholder="Новый логин"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        type="password" 
                        placeholder="Новый пароль" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <label>
                    <input 
                        type="email" 
                        placeholder="Новая почта" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                {error ?
                    <p style={{ color: "red" }}>{error}</p>
                    :
                    ""
                }
            </form>
            <div className="form_buttons">
                <button onClick={() => {
                    setModalActive(false)
                    setError('')
                }}>Закрыть</button>
                <button onClick={startChange}>Сохранить</button>
            </div>
        </Modal>
    );
};

export default ChangeSettings;