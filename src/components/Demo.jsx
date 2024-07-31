import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../Services/article.js";

const Demo = () => {
  const [article, setArticle] = useState({ url: "", summary: "" });

  const [allarticles, setAllarticles] = useState([]);
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  const[copied,setcopied]=useState("");
  useEffect(() => {
    const articlesfromlocalstorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articlesfromlocalstorage) {
      setAllarticles(articlesfromlocalstorage);
    } //to store in local
  }, []);
  const handlesubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allarticles];
      setArticle(newArticle);
      setAllarticles(updatedAllArticles);

      console.log(newArticle);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles)); //to save in local storage
    }
  };
  const handlecopy=(copyurl)=>{
    setcopied(copyurl);
    navigator.clipboard.writeText(copyurl);
    setTimeout(()=>setcopied(false),3000);
  }
  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handlesubmit}
        >
          {/* <img
            src={linkIcon}
            alt="link"
            className="absolute left-0 my-2 ml-3 w-5"
          /> */}
          <input
            type="url"
            placeholder="Enter your Buisness Requirment"
            required
            className="url_input peer"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
          ></input>
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            ⤦
          </button>
        </form>
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allarticles.map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)} 
              className="p-3 flex justify-start items-center flex-row bg-white border border-gray-200 gap-3 rounded-lg cursor-pointer"
            >
              <div
              
              
              className="copy_btn" onClick={()=>{handlecopy(item.url)}}>
                <img
                  src={copied===item.url?tick:copy}
                  className="w-[40%] h-[40%] object-contain"
                  alt="Copy"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-500 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className=",y-10 max-w-full flex justify-center items-center">
        {/* {isFetching ? (
          <img
            src={loader}
            alt="loading"
            className="w-20 h-20 object-contain"
          />
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Somthing went wrong...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error?.data?.error}
            </span>
          </p>
        ) : ( */}
          {/* article.summary &&  */}
          
          <div className="flex flex-col gap-3">
            <h2 className="font-satoshi font-bold text-grat-600">Suggested <span className="blue_gradient">
                Workflow</span></h2>
                <div className="summary_box">
                    <p className="font-inter font-medium text-sm text-gray-700">
          
                      {/* {article.summary} */}
                       As a repository manager,
                      I want to have the ability to bulk upload directories and files with minimal effort, so that I can manage the repository more efficiently.           </p>
                </div>

          </div>
        {/* )} */}
      </div>
    </section>
  );
};

export default Demo;
