import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import button from "src/styles/Button.module.css";
import Header from "src/layout/header/Header";
import styles from "src/page/regist/TodoRegist.module.css";


interface TodoRegist {
  title: string;
  content: string;
  done?: boolean;
}


const TodoRegistPage = (): JSX.Element => {
  const BASE_URL: string | undefined = 
  process.env.REACT_APP_PORT_NUMBER;
  const navigate = useNavigate();
  const [input, setInput] = useState({ title: "", content: "" });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { title, content } = input;
    if (!title || !content) {
      alert("할일을 입력하세요^^");
      return;
    }

    const body: TodoRegist = {
      title,
      content,
      done: false,
    };

    try {
      if (window.confirm("등록 하시겠습니까?")) {
        const response = await axios.post<AxiosResponse>(
          `${ BASE_URL }/api/todolist`,
          body
        );

        if (response.status === 200) {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackBtnClick = () => {
    if (window.confirm("취소 하시겠습니까?")) {
      navigate("/");
    }
  };

  return (
    <>
      <Header title={"등록 페이지"} />
      <form className={styles["regist-form"]} onSubmit={handleFormSubmit}>
        <input
          name="title"
          type="text"
          placeholder="할일 제목"
          value={input.title}
          onChange={handleInputChange}
        />
        <textarea
          name="content"
          placeholder="할일 내용"
          value={input.content}
          onChange={handleInputChange}
        ></textarea>
        <div className="button-area">
          <button
            type="button"
            className=
            { `${ button.backButton } ${ button.button }` }
            onClick={handleBackBtnClick}
          >
            취소
          </button>
          <button className=
          { `${ button.defaultButton } ${ button.button }` } >
            등록
            </button>
        </div>
      </form>
    </>
  );
};

export default TodoRegistPage;
