import React, {lazy, useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";

import {useNavigate} from "react-router-dom";

import axios from "../Request/RequestConfig";
import SearchProducts from "./SearchProducts";
import Paging from "../../components/Paging";


const SearchView = () => {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [totalItems, setTotalItems] = useState(0);

  const keyword = searchParams.get('keyword');

  useEffect(() => {
    handleSearch().then((products) => {
      console.log(products.length);
      setCurrentProducts(products);
      setTotalItems(products.length);
    })
        .catch((error) => {
          console.error('Error occurred while fetching products:', error);
        })
  }, [keyword]);


  const onPageChanged = (page) => {
    handleSearch().then((products) => {
      const {currentPage, totalPages, pageLimit} = page;
      const offset = (currentPage - 1) * pageLimit;
      const currentProducts = products.slice(offset, offset + pageLimit);

      setCurrentPage(currentPage);
      setCurrentProducts(currentProducts);
      setTotalPages(totalPages);
    })
        .catch((error) => {
          console.error("Error occurred while fetching products:", error);
        });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/search?keyword=${keyword}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status == 200) {
        const data = await response.data.data;
        console.log(data);
        return data;
      } else {
        console.error('게시글을 가져오지 못했습니다.');
      }
    } catch (error) {
      console.error('에러발생..', error);
    }
  };


  return (
      <React.Fragment>
        <div className="bg-secondary border-top p-4 text-white mb-3">
          <h1 className="display-6 text-center">Result Searching</h1>
        </div>
        <div className="container mb-3">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="table-responsive">
                  <table className="table table-borderless">
                    <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col" width={120}>thumbnail</th>
                      <th scope="col" width={120}>
                        title
                      </th>
                      <th scope="col" width={150}>
                        content
                      </th>
                      <th scope="col"  width={130}>by</th>
                    </tr>
                    </thead>
                    {currentProducts.map((item, idx) => {
                      return (
                          <tbody key={idx}>
                          <SearchProducts
                              item={item}
                          />
                          </tbody>
                      )
                    })}
                  </table>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="bg-light border-top p-4">
          <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
            <Paging
                totalRecords={totalItems}
                pageLimit={9}
                pageNeighbours={3}
                onPageChanged={onPageChanged}
                sizing=""
                alignment="justify-content-center"
            />
          </div>
        </div>
      </React.Fragment>
  );
};

export default SearchView;
