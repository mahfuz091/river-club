import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "../../axios/axios-instance";

import CardOption from "./CardOption";

const ItemModal2 = ({
  singleData,
  setShowModal,
  value,
  setControl,
  control,
}) => {
  const { name, image, price, qty } = singleData;
  const [item, setItem] = useState([]);
  const [option, setOption] = useState([]);
  const [addItem, setAddItem] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [bg, setBg] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);


  const handleItemClick = (itemId) => {
    let newSelectItem = [];

    if (selectedItem) {
      const newSelectItem = [...selectedItem, itemId];
      const isThisItem = selectedItem?.find((it) => it === itemId);

      if (isThisItem) {


        const filterIt = selectedItem?.filter((it) => it.data?.id !== itemId);

        setSelectedItem(filterIt);
        const categoryQty = selectedItem?.filter(
          (it) => it?.data?.category?.id === itemId
        );
        setCategoryQty(categoryQty);
        const filterData = selectedItem?.filter((it) => it !== itemId);
        // console.log(filterData);
        setSelectedItem(filterData);
      } else setSelectedItem(newSelectItem);
    } else {
      newSelectItem.push(itemId);
      setSelectedItem(newSelectItem);
    }
  };

  const handleAddComment = (comment) => {
    const previousItem = JSON.parse(localStorage.getItem("item"));
    if (previousItem) {
      previousItem?.map((it) => {
        it.data.comment = comment;
      });
    }
    localStorage.setItem("item", JSON.stringify(previousItem));
  };
  const [categoryQty, setCategoryQty] = useState([]);

  useEffect(() => {
    if (option.length === selectedItem?.length) {
      setDisabled(false);
    } else if (!option.length) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [option, selectedItem]);
  // console.log(categoryQty);
  // useEffect(() => {
  //   // console.log(categoryQty.length);
  //   if (categoryQty.length > 0) {
  //     setDisabled(true);
  //   } else {
  //     setDisabled(false);
  //   }
  // }, [categoryQty]);

  const handleItemAdd = (data) => {
    let newSelectItem = [];

    const item = { data };
    if (selectedOption) {
      const newSelectItem = [...selectedOption, item];
      const isThisItem = selectedOption.find((it) => it.data.id == data.id);
      // console.log(isThisItem);
      if (isThisItem) {
        const filterData = selectedOption.filter(
          (it) => it.data.id !== data.id
        );
        console.log(filterData);
        setSelectedOption(filterData);
      } else {
        setSelectedOption(newSelectItem);
      }
      // setDisabled(false);
    } else {
      newSelectItem.push(item);
      setSelectedOption(newSelectItem);
      // setDisabled(false);
    }
  };


  const addToItem = (data) => {
    if (value === 0) {
      Swal.fire({
        title: "veuillez ajouter au moins une quantité",
        icon: "error",
        text: "vous serez redirigé dans quelques instants...",
        showConfirmButton: false,
        timer: 2000,
      });
      setShowModal(false);
      return;
    }
    let newItem = [];
    const comment = inputValue;

    data.comment = comment;
    const item = { data };
    const selectedqty = value;

    data.qty = selectedqty;

    const previousItem = JSON.parse(localStorage.getItem("option"));
    if (previousItem) {
      const newItem = [...previousItem, item];
      const isThisItem = previousItem.find((it) => it.data.id == data.id);
      const categoryQty = previousItem?.filter(
        (it) => it?.data?.category?.id === data?.category?.id
      );
      setCategoryQty(categoryQty);

      if (isThisItem) {
        // Swal.fire({
        //   title: "veuillez ajouter au moins une quantité",
        //   icon: "error",
        //   text: "vous serez redirigé dans quelques instants...",
        //   showConfirmButton: false,
        //   timer: 2000,
        // });
      } else {
        localStorage.setItem("option", JSON.stringify(newItem));
        setItem(newItem);
      }
    } else {
      newItem.push(item);
      localStorage.setItem("option", JSON.stringify(newItem));
      setItem(newItem);
    }
  };

  const handleOK = (data) => {
    Swal.fire({
      title: "Produit bien ajouté",
      icon: "success",
      text: "vous serez redirigé dans quelques instants...",
      showConfirmButton: false,
      timer: 2000,
    });
    handleAddComment(inputValue);
    setShowModal(false);
    setControl(!control);
    if (data) {
      let newItem = [];
      const comment = inputValue;

      data.comment = comment;
      data.options = selectedOption;
      const runningItem = { data };
      const selectedqty = value;

      singleData.qty = selectedqty;
      if (data.qty === 0) {
        Swal.fire({
          title: "veuillez ajouter au moins une quantité",
          icon: "error",
          text: "vous serez redirigé dans quelques instants...",
          showConfirmButton: false,
          timer: 2000,
        });
        setShowModal(false);
        return;
      }
      const previousItem = JSON.parse(localStorage.getItem("item"));

      if (previousItem) {
        const newItem = [...previousItem, runningItem];
        const filterItem = previousItem.filter((it) => it.data.id !== data.id);
        const isThisItem = previousItem.find((it) => it.data.id === data.id);

        const thisItem = previousItem.filter((it) => it.data.id === data.id);


        if (isThisItem) {
          isThisItem.data.qty = isThisItem.data.qty + selectedqty;
          const newItem = [...filterItem, isThisItem];

          localStorage.setItem("item", JSON.stringify(newItem));
          setItem(newItem);
          setControl(!control);
          if (thisItem.length > 1) {
            return;
          } else {
            if (isThisItem.data.options.length) {
              if (isThisItem.data.options.length === selectedItem.length) {
                for (let i = 0; i < isThisItem.data.options.length; i++) {
                  if (isThisItem.data.options[i].data.id === selectedItem[i]) {


                    console.log(isThisItem.data.qty);

                    const newItem = [...filterItem, isThisItem];

                    localStorage.setItem("item", JSON.stringify(newItem));
                    setItem(newItem);
                    setControl(!control);
                  } else {
                    // isThisItem.data.qty = isThisItem.data.qty + selectedqty;


                    const newItem = [...previousItem, runningItem];

                    localStorage.setItem("item", JSON.stringify(newItem));
                    setItem(newItem);
                    setControl(!control);
                  }
                }
              }

            }
          }
        } else {
          localStorage.setItem("item", JSON.stringify(newItem));
          setItem(newItem);
          setControl(!control);
        }


      }

      else {
        newItem.push(runningItem);
        localStorage.setItem("item", JSON.stringify(newItem));
        setItem(newItem);
        setControl(!control);

      }
    } else {
      setControl(!control);
    }
  };




  const handleOpOk = (data) => {

    Swal.fire({
      title: "Produit bien ajouté",
      icon: "success",
      text: "vous serez redirigé dans quelques instants...",
      showConfirmButton: false,
      timer: 2000,
    });
    handleAddComment(inputValue);
    setShowModal(false);
    setControl(!control);
    if (data) {
      let newItem = [];
      const comment = inputValue;
      // console.log(inputValue);
      data.comment = comment;
      data.options = selectedOption;
      const runningItem = { data };
      const selectedqty = value;
      // console.log(selectedqty);
      singleData.qty = selectedqty;

      const previousItem = JSON.parse(localStorage.getItem("item"));
      if (previousItem.length) {
        const newItem = [...previousItem, runningItem];
        const filterItem = previousItem.filter((it) => it.data.id !== data.id);
        const isThisItem = previousItem.find((it) => it.data.id === data.id);

        const thisItem = previousItem.filter((it) => it.data.id === data.id);
        // console.log(thisItem);
        if (thisItem.length) {
          // if (thisItem[1].data.qty > 0) {
          //   thisItem[0].data.qty = thisItem[0].data.qty - 1;
          // }



          thisItem.map((tIt) => {

            tIt.data.qty = tIt.data.qty + selectedqty;

            for (let i = 0; i < tIt.data.options.length; i++) {
              if (tIt.data.options[i].data.id === selectedItem[i]) {


                const newItem = [...previousItem];

                localStorage.setItem("item", JSON.stringify(newItem));
                setItem(newItem);
                setControl(!control);
              } else if (thisItem.length < 2) {
                const newItem = [...previousItem, runningItem];

                localStorage.setItem("item", JSON.stringify(newItem));
                setItem(newItem);
                setControl(!control);
              }
            }
          });
        } else {
          localStorage.setItem("item", JSON.stringify(newItem));
          setItem(newItem);
          setControl(!control);
        }
      } else {
        newItem.push(runningItem);
        localStorage.setItem("item", JSON.stringify(newItem));
        setItem(newItem);
        setControl(!control);
      }
    } else {
      setControl(!control);
    }
  };

  useEffect(() => {
    async function getOption() {
      try {
        const response = await axiosInstance.get(
          `/prods/options/${singleData.id}`
        );
        // console.log(response.data.length);
        setOption(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getOption();
  }, [singleData]);

  return (
    <>
      <div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none '>
        <div className='relative  my-6 mx-auto w-[360px] h-1/2'>
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            <div className='modal-box'>
              <form method='dialog'>
                {/* if there is a button in form, it will close the modal */}
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                  className='close-btn absolute right-[10px] top-[10px]'
                >
                  ✕
                </button>
              </form>
              {option.length > 0 ? (
                <>
                  <h3 className='comment-title'>
                    Choisir {singleData.categoryID}
                  </h3>
                </>
              ) : (
                ""
              )}

              {option.length > 0 ? (
                <>
                  {option?.map((singleOption, index) => (
                    <CardOption
                      selectedItem={selectedItem}
                      handleItemClick={handleItemClick}
                      handleOK={handleOK}
                      handleOpOk={handleOpOk}
                      setAddItem={setAddItem}
                      addToItem={addToItem}
                      singleOption={singleOption}
                      key={index}
                      handleItemAdd={handleItemAdd}
                      selectedOption={selectedOption}
                      setInputValue={setInputValue}
                      inputValue={inputValue}
                    />
                  ))}
                </>
              ) : (
                <>
                  <div className='mt-[50px]'></div>
                </>
              )}

              <input
                type='text'
                name=''
                id=''
                className='modal-input ml-[20px]'
                placeholder='Write something...'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />

              <button
                disabled={disabled}
                className={disabled ? "ok-btn-diasabled" : "ok-btn"}
                // className='ok-btn'
                onClick={
                  option.length > 0
                    ? () => handleOpOk(singleData)
                    : () => handleOK(singleData)
                }
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemModal2;
