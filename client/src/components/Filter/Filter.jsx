import React from "react";
import Select from "../Select/Select";
import "./filter.css"

const Filter = () => {
    const optionsDate = ["За всё время", "Сегодня", "За эту неделю", "За этот месяц", "За этот год"];
    const optionsCategory = ["Все категории", "Игры", "Аниме", "Япония"];

    return (
        <div>
            <div className="filter">
                <h2>Фильтр</h2>
                <div className="filter-input">
                    <label>
                        Дата добавления
                    </label>
                    <Select options={optionsDate} />
                    <label>
                        Теги
                    </label>
                    <input type="text" placeholder="#anime" />
                    <label>
                        Автор
                    </label>
                    <input type="text" placeholder="Никнейм" />
                    <label>
                        Категория
                    </label>
                    <Select options={optionsCategory} />
                    <input type="submit" value="Применить" />
                </div>
            </div>
        </div>
    )
}

export default Filter;