import { useEffect, useContext, useState } from "react";
import { getNews, createNews, deleteNews } from "../utils/api";
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { Button } from "primereact/button";
import NewsForm from "./NewsForm";
import { UserContext } from "../context/UserContext";
import { Toast } from 'primereact/toast';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { confirmPopup } from 'primereact/confirmpopup';
 
const News = () => {
  const { user } = useContext(UserContext);
  const [news, setNews] = useState([]);
  const [isNew, setIsNew] = useState(false);
const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    getNews().then((response) => {
      sortByDate(response.data);
    });
  }, []);

useEffect(() => {

}, [confirmDelete])

  const sortByDate = (data) => {
    let sorted = data.sort((a, b) => b.id - a.id);
    setNews([...sorted]);
  };

  const header = (data) => {
    if (data === "") return data;
    return <img alt="Card" src={`${data}`} />;
  };

  const footer = (id) => {
    return user === "Admin" ? (
      //   <Button
      //     label="Delete"
      //     className="p-button p-component p-button-raised  p-button-danger p-button-text"
      //     onClick={confirm}
      //   />
      <button
        style={{
          borderRadius: "4px",
          backgroundColor: "red",
          color: "#fff",
          textAlign: "center",
          margin: "4px 2px",
          cursor: "pointer",
          padding: "15px 32px"
        }}
        name={id}
        onClick={confirm}
      >
        Delete
      </button>
    ) : (
      ""
    );
};

const deleteRecord = async (id) => {
    const newState = news.filter((n) => {
        if (n.id !== Number(id)) {
          return n;
        }
      });
    setNews(() => [...newState]);
    await deleteNews(id);
}

const confirm = (event) => {
    confirmPopup({
        target: event.currentTarget,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => deleteRecord(event.target.name),
        reject: null
    });
}
  const onCreateNews = (data) => {
    setIsNew(!isNew);
    createNews(data).then((response) => {
      setNews((previous) => [response.data, ...previous]);
    });
  };

  return (
    <div>
      {user === "Admin" && (
        <Button
          style={{ marginBottom: "20px" }}
          label="New"
          className="p-button p-component p-button-raised  p-button-success p-button-text"
          onClick={() => setIsNew(!isNew)}
        />
      )}
      <Dialog
        visible={isNew}
        style={{ width: "40vw", fontFamily: "cursive" }}
        onHide={() => setIsNew(false)}
        header="News content"
      >
        <NewsForm createNews={onCreateNews} />
      </Dialog>
      <div
        style={{
          fontFamily: "cursive",
          color: "#0b213f",
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          gap: "20px",
          textAlign: "justify",
        }}
      >
        {news.length > 0 && news?.map((n) => (
          <Card
            key={n.id}
            title={n?.title}
            subTitle={n?.date}
            header={header(n?.image)}
            footer={footer(n?.id)}
          >
            {n?.important && (
              <div>
                <p style={{ color: "red" }}>IMPORTANT!</p>
                <hr style={{ border: "solid 0.5px red" }}></hr>
              </div>
            )}
            <p>{n?.content}</p>
          </Card>
        ))}
      </div>
      <ConfirmPopup />
    </div>
  );
};
export default News;
