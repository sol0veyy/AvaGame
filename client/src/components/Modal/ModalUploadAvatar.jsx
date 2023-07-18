import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { createAvatar } from "../../http/avatarsAPI";
import Modal from "./Modal";
import { Context } from '../..';

const ModalUploadAvatar = ({ modalActive, setModalActive}) => {
    const infoUser = jwt_decode(localStorage.getItem('token'))
    const {user, avatars} = useContext(Context)
    const [imgUrl, setImgUrl] = useState("");
    const [sizeImg, setSizeImg] = useState("");
    const [errorImg, setErrorImg] = useState("");
    const [tags, setTags] = useState("");

    const [viewImg, setViewImg] = useState(false);
    const [file, setFile] = useState(null);

    const selectFile = e => {
        setFile(e.target.files[0]);
        setErrorImg("");
        setViewImg(true);
    }

    useEffect(() => {
        if (file) {
            setImgUrl(URL.createObjectURL(file));
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                setSizeImg(img.width + "x" + img.height);
            }
        }
    }, [file]);

    const uploadAvatar = () => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            if (img.width === img.height && file.type === "image/jpeg") {
                const regular = /#|\s#/
                const arrTags = tags.split(regular).filter(el => el !== '');
                const formData = new FormData();
                formData.append('userId', `${infoUser.id}`);
                formData.append('categoryId', "2");
                formData.append('img', file);
                formData.append('tags', JSON.stringify(arrTags));
                createAvatar(formData, infoUser).then(data => {
                    avatars.setAvatars(data);
                    setModalActive(false);
                });
                setViewImg(false);
                user.setUser({...user.user, publications: user.user['publications'] + 1})
            } else {
                setErrorImg("Фото не соответсвует требованиям!");
                console.log(errorImg);
                return;
            }
        }
    }

    return (
        <Modal active={modalActive} setActive={setModalActive}>
            <form className="formUploadAvatar">
                {viewImg ?
                    <div>
                        <img src={imgUrl} style={{ marginTop: "20px" }} alt="img" width="300px" height="300px" />
                        <p>{sizeImg}</p>
                        {errorImg ?
                            <p style={{ color: "red" }}>{errorImg}</p>
                            :
                            ""
                        }
                    </div>
                    :
                    ""
                }
                <label>
                    <input
                        type="file"
                        onChange={selectFile}
                    />
                </label>
                <div className="rules">
                    <p>Изображение должно быть:</p>
                    <p>- в формате JPG или PNG</p>
                    <p>- 1 к 1</p>
                </div>
                <label>
                    <div className="full_input">
                        <div className="nameInput">Теги</div>
                        <input 
                            type="text" 
                            placeholder="#anime" 
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>
                </label>
            </form>
            <div className="form_buttons">
                <button onClick={() => setModalActive(false)}>Закрыть</button>
                <button onClick={uploadAvatar}>Опубликовать</button>
            </div>
        </Modal>
    );
};

export default ModalUploadAvatar;