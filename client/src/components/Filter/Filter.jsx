import React from "react";
import Select from "../Select/Select";
import "./filter.css"

const Filter = ({setTime, setTags, setAuthor, setCategory, filterAvatar}) => {
    // const optionsDate = ["За всё время", "Сегодня", "За эту неделю", "За этот месяц", "За этот год"];
    const optionsDate = [
        {value: "", name: "За всё время"},
        {value: "day", name: "Сегодня"},
        {value: "week", name: "За эту неделю"},
        {value: "month", name: "За этот месяц"},
        {value: "year", name: "За этот год"}
    ]
    // const optionsCategory = [
    //     {value: "", name: "Все категории"},
    //     {value: 2, name: "Аниме"},
    //     {value: 3, name: "Девушки"}
    // ];

    return (
        <div>
            <div className="filter">
                <h2>Фильтр</h2>
                <div className="filter-input">
                    <label>
                        Дата добавления
                    </label>
                    <Select options={optionsDate} setTime={setTime} />
                    <label>
                        Тег
                    </label>
                    <input 
                        type="text" 
                        placeholder="#anime" 
                        onChange={(e) => setTags(e.target.value)} 
                    />
                    <label>
                        Автор
                    </label>
                    <input 
                        type="text" 
                        placeholder="Никнейм"
                        onChange={(e) => setAuthor(e.target.value)} 
                    />
                    {/* <label>
                        Категория
                    </label>
                    <Select options={optionsCategory} setCategory={setCategory} /> */}
                    <input onClick={filterAvatar} type="submit" value="Применить" />
                </div>
            </div>
        </div>
    )
}

export default Filter;