import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { createAvatar } from "../../http/avatarsAPI";
import Modal from "./Modal";
import { Context } from '../..';

const ModalUploadAvatar = ({ modalActive, setModalActive}) => {
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
                formData.append('userId', `${user.id}`);
                formData.append('categoryId', "2");
                formData.append('img', file);
                formData.append('tags', JSON.stringify(arrTags));
                createAvatar(formData, user).then(data => {
                    avatars.setAvatars(data);
                    setModalActive(false);
                });
                setViewImg(false);
                user.setUser({...user, publications: user.publications + 1})
                
            } else {
                setErrorImg("Фото не соответсвует требованиям!");
            }
        }
    }

    return (
        <Modal active={modalActive}>
            <form>
                {viewImg ?
                    <div className='d-flex flex-column align-items-center gap-2 mb-3'>
                        <img src={imgUrl} alt="img" width="300px" height="300px" />
                        <p className='text-secondary-emphasis mb-0'>{sizeImg}</p>
                        {errorImg ?
                            <p className='text-danger mb-0'>{errorImg}</p>
                            :
                            ""
                        }
                    </div>
                    :
                    ""
                }
                <div className='mb-3'>
                    <input 
                        type="file" 
                        className='form-control' 
                        onChange={selectFile}
                    />
                </div>
                <div className='upload_rules text-secondary-emphasis'>
                    <p>Изображение должно быть:</p>
                    <p>- в формате JPG или PNG</p>
                    <p>- 1 к 1</p>
                </div>
                <div className='row'>
                    <label htmlFor="inputTags" className='col-sm-2 col-form-label'>Теги</label>
                    <div className='col-sm-10'>
                        <input 
                            id='inputTags' 
                            type="text" 
                            className='form-control' 
                            placeholder='#anime' 
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>
                </div>
            </form>
            <div className="d-flex justify-content-end gap-2 mt-3">
                <button className='btn btn-outline-secondary' onClick={() => setModalActive(false)}>Закрыть</button>
                <button className='btn btn-success' onClick={uploadAvatar}>Опубликовать</button>
            </div>
        </Modal>
    );
};

export default ModalUploadAvatar;