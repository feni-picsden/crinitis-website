import React, { useState, Fragment, useEffect } from "react";
import { Tab, Listbox, Transition } from "@headlessui/react";
import { Link, Element, animateScroll as scroll, scroller } from "react-scroll";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material"; // Updated to MUI v5

export default function MenuList(props) {
  const [sticky, setSticky] = useState(false);
  const [isIphone, setIsIphone] = useState(false);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // Check for iPhone in the user agent
    if (/iPhone/i.test(userAgent)) {
      setIsIphone(true);
    }
  }, []);

  useEffect(() => {
    let menus = [];
    if (props?.menu?.length > 0) {
      for (let i = 0; i < props?.menu?.length; i++) {
        let categories = [];
        const temp = props?.menu[i]?.acf?.menu_categories || [];

        for (let j = 0; j < temp?.length; j++) {
          let items = [];
          let isPizza = false;
          let isClassicDrink = false;
          let isDrink = false;
          if (props?.menuItems?.length > 0) {
            for (let k = 0; k < props?.menuItems?.length; k++) {
              if (props?.menuItems[k].categories.length > 0) {
                for (
                  let l = 0;
                  l < props?.menuItems[k].categories?.length;
                  l++
                ) {
                  if (
                    parseInt(props?.menuItems[k].categories[l].term_id) ===
                    parseInt(temp[j].term_id)
                  ) {
                    if (
                      typeof props?.menuItems[k]?.acf?.top_menus !== "undefined"
                    ) {
                      for (
                        let m = 0;
                        m < props?.menuItems[k]?.acf?.top_menus?.length;
                        m++
                      ) {
                        if (
                          parseInt(
                            props?.menuItems[k]?.acf?.top_menus[m]?.ID
                          ) === props?.menu[i]?.ID
                        ) {
                          items.push(props?.menuItems[k]);
                          if (
                            !isPizza &&
                            props?.menuItems[k]?.acf
                              ?.item_price_display_type === "Pizza Price"
                          ) {
                            isPizza = true;
                          }
                          if (
                            !isClassicDrink &&
                            props?.menuItems[k]?.acf
                              ?.item_price_display_type === "Litter Drink Price"
                          ) {
                            isClassicDrink = true;
                          }
                          if (
                            !isDrink &&
                            props?.menuItems[k]?.acf
                              ?.item_price_display_type ===
                              "Glass Bottle Drink Price"
                          ) {
                            isDrink = true;
                          }
                        }
                      }
                    } else {
                      items.push(props?.menuItems[k]);
                      if (
                        !isPizza &&
                        props?.menuItems[k]?.acf?.item_price_display_type ===
                          "Pizza Price"
                      ) {
                        isPizza = true;
                      }
                      if (
                        !isClassicDrink &&
                        props?.menuItems[k]?.acf?.item_price_display_type ===
                          "Litter Drink Price"
                      ) {
                        isClassicDrink = true;
                      }
                      if (
                        !isDrink &&
                        props?.menuItems[k]?.acf?.item_price_display_type ===
                          "Glass Bottle Drink Price"
                      ) {
                        isDrink = true;
                      }
                    }
                  }
                }
              }
            }
          }

          categories.push({
            id: temp[j].term_id,
            name: decodeURI(temp[j].name),
            is_pizza: isPizza,
            is_classic_drink: isClassicDrink,
            is_drink: isDrink,
            items: items,
          });
        }
        let pdf =
          typeof props?.menu[i]?.acf?.pdf !== "undefined" &&
          props?.menu[i]?.acf?.pdf
            ? props?.menu[i]?.acf?.pdf
            : "";

        let mainCat = {
          id: props?.menu[i]?.ID,
          name: props?.menu[i]?.post_title,
          isPDF: pdf !== "" && props?.menu[i]?.acf?.have_pdf === "Yes",
          pdf: pdf,
          categories: categories,
        };

        menus.push(mainCat);
      }
    }

    let ca = null;
    if (
      menus?.length > 0 &&
      typeof menus[0].categories !== "undefined" &&
      menus[0].categories.length > 0
    ) {
      ca = menus[0].categories[0];
    }
    setSelectedSubCategory(ca);
    /**
     * Filter applied
     */
    let filterData = [];
    for (let i = 0; i < menus.length; i++) {
      filterData[i] = { ...menus[i] };
      filterData[i].categories = [];
      if (menus[i].categories.length > 0) {
        for (let j = 0; j < menus[i].categories.length; j++) {
          let cats = { ...menus[i].categories[j] };
          cats.items = [];
          if (menus[i].categories[j].items.length > 0) {
            for (let k = 0; k < menus[i].categories[j].items.length; k++) {
              let item = { ...menus[i].categories[j].items[k] };
              let add = true;
              // name filter
              if (
                search !== "" &&
                !item.post_title.toLowerCase().includes(search.toLowerCase())
              ) {
                add = false;
              } else {
                // type filter
                if (type !== "") {
                  add = false;
                  if (type === "is_vegan" && item?.acf?.is_vegan) {
                    add = true;
                  } else if (type === "is_gf" && item?.acf?.is_gf) {
                    add = true;
                  } else if (type === "is_veg" && item?.acf?.is_veg) {
                    add = true;
                  } else if (
                    type === "is_signature" &&
                    item?.acf?.is_signature
                  ) {
                    add = true;
                  } else if (
                    type === "is_spicy_dish" &&
                    item?.acf?.is_spicy_dish
                  ) {
                    add = true;
                  } else if (
                    type === "is_contains_nuts" &&
                    item?.acf?.is_contains_nuts
                  ) {
                    add = true;
                  } else if (
                    type === "is_contains_pork" &&
                    item?.acf?.is_contains_pork
                  ) {
                    add = true;
                  }
                }
              }

              if (add) {
                cats.items.push(item);
              }
            }
          }

          if (cats.items.length > 0) {
            filterData[i].categories.push(cats);
          }
        }
      }
    }
    setFilteredMenu(filterData);
  }, [props?.menu, props?.menuItems, search, type]);

  // for header sticky
  const addStickyClass = () => {
    if (typeof window !== "undefined") {
      setSticky(window.scrollY >= 50);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", addStickyClass);
  }, []);

  return (
    <>
      <Tab.Group key={`tab_group_menu_list`}>
        <Tab.List
          className={`${
            sticky ? "sticky" : ""
          } main-cat flex top-12 md:top-14 xl:top-20 pl-4 w-full bg-white z-50 whitespace-nowrap overflow-x-scroll xl:overflow-auto  py-3 md:py-4 border-b border-gray-200 space-x-6`}
        >
          {filteredMenu.map((menuItem) => (
            <Tab as={Fragment} key={`tab_${menuItem.id}`}>
              {({ selected }) => (
                <button
                  className={`${
                    selected ? "bg-black text-white" : ""
                  } px-3 md:px-6 py-1.5  inline-block text-center text-sm md:text-base font-bold focus:outline-none tracking-wide  uppercase border-3  transtion duration-300`}
                  onClick={() => {
                    if (typeof menuItem.categories[0] !== "undefined") {
                      setSelectedSubCategory(menuItem.categories[0]);
                    } else {
                      setSelectedSubCategory(null);
                    }
                    scroll.scrollTo(400, {
                      duration: 500,
                      smooth: true,
                    });
                  }}
                >
                  {menuItem.name}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {filteredMenu.map((menuItem) => (
            <Tab.Panel key={`tab_panel_${menuItem.id}`}>
              {menuItem?.isPDF ? (
                <div className="lg:flex gap-7  lg:px-10  xl:px-24 mt-4">
                  {isIphone ? (
                    <div className="text-center">
                      <a
                        rel="noreferrer"
                        target="_blank"
                        className="MuiButtonBase-root MuiButton-root MuiButton-contained blockbtn bgblack MuiButton-containedPrimary"
                        href={menuItem?.pdf}
                      >
                        View {menuItem.name}
                      </a>
                    </div>
                  ) : (
                    <iframe
                      src={menuItem?.pdf}
                      width="100%"
                      height="900px"
                      style={{ border: "none" }}
                    >
                      This browser does not support PDFs. Please download the
                      PDF to view it:
                      <a href={menuItem?.pdf}>Download PDF</a>.
                    </iframe>
                  )}
                </div>
              ) : (
                <>
                  <div className="lg:flex lg:mb-6 mt-4 gap-7 px-6 lg:px-10  xl:px-24">
                    <div className="lg:w-[190px]"></div>
                    <div className="lg:w-10/12 px-4 pb-2 bg-[#f9f9f9]">
                      <div className="filter">
                        <form autoComplete="off" className="filter-form">
                          <div className="md:flex md:space-x-5">
                            <div className="md:w-8/12">
                              <div className="search flex w-full items-center">
                                <TextField
                                  variant="standard"
                                  id="search"
                                  value={search}
                                  onChange={(e) => setSearch(e.target.value)}
                                  label="Search by item name"
                                  margin="normal"
                                  fullWidth
                                />

                                {search !== "" && (
                                  <button
                                    onClick={() => setSearch("")}
                                    type="button"
                                    className="relative right-5 top-3"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-5 h-5"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                      />
                                    </svg>
                                  </button>
                                )}
                              </div>
                            </div>

                            <div className="md:w-4/12">
                              <div className="grid grid-cols-1 gap-6 space-x-3">
                                <FormControl fullWidth margin="normal">
                                  <InputLabel htmlFor="type" variant="standard">
                                    Filter By
                                  </InputLabel>
                                  <Select
                                    variant="standard"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                  >
                                    <MenuItem value={""}>All</MenuItem>
                                    <MenuItem value={"is_vegan"}>
                                      <img
                                        src="/img/icon/symbol-vegan.svg"
                                        className="w- h-6 mr-2.5"
                                      />
                                      Vegan
                                    </MenuItem>

                                    <MenuItem value={"is_gf"}>
                                      <img
                                        src="/img/icon/symbol-gf.svg"
                                        className="w- h-6 mr-2.5"
                                      />
                                      Gluten Free
                                    </MenuItem>

                                    <MenuItem value={"is_veg"}>
                                      <img
                                        src="/img/icon/symbol-veg.svg"
                                        className="w- h-6 mr-2.5"
                                      />
                                      Veg
                                    </MenuItem>

                                    <MenuItem value={"is_signature"}>
                                      <img
                                        src="/img/icon/symbol-crinitis-fav.svg"
                                        className="w- h-6 mr-2.5"
                                      />
                                      Signature Dish
                                    </MenuItem>
                                    <MenuItem value={"is_spicy_dish"}>
                                      <img
                                        src="/img/icon/chili-pepper.svg"
                                        className="w- h-6 mr-2.5"
                                      />
                                      Spicy Dish
                                    </MenuItem>
                                    <MenuItem value={"is_contains_nuts"}>
                                      <img
                                        src="/img/icon/contains_nuts.png"
                                        className="w- h-6 mr-2.5"
                                      />
                                      Contains Nuts
                                    </MenuItem>
                                    <MenuItem value={"is_contains_pork"}>
                                      <img
                                        src="/img/icon/contains_pork.png"
                                        className="w- h-6 mr-2.5"
                                      />
                                      Contains Pork
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="lg:flex gap-7  lg:px-10  xl:px-24">
                    <div
                      className={`${
                        sticky ? "sticky lg:top-40" : "relative md:top-4"
                      } category-nav overflow-y-auto h-[70vh] 2xl:h-[78vh] pb-8 psudeo-none top-12 md:top-1 text-right z-10 pr-4 xl:border-r xl:border-gray-200 text-gray-500 hidden lg:flex flex-col bg-white  py-t md:pt-4 uppercase md:space-y-4 tracking-widest text-sm md:text-sm`}
                    >
                      {menuItem.categories.map((cat, i) => (
                        <Link
                          legacyBehavior
                          activeClass="active"
                          to={cat.name}
                          spy={true}
                          onClick={() => {
                            setSelectedSubCategory(cat);
                          }}
                          smooth={true}
                          offset={-225}
                          duration={500}
                          key={i}
                          isDynamic={true}
                        >
                          <span
                            className="cursor-pointer"
                            style={{ whiteSpace: 'pre-wrap' }}
                            dangerouslySetInnerHTML={{ __html: cat.name }}
                          />
                        </Link>
                      ))}
                    </div>

                    <div
                      className={`${
                        sticky ? "lg:top-12 lg:relative sticky" : "lg:relative"
                      } lg:hidden top-28 lg:top-4 lg:w-2/12 mt-0 lg:mt-[4rem] lg:mr-6`}
                    >
                      {/* For Mobile/iPad  */}
                      <div className="lg:hidden px-6 py-3 bg-white shadow">
                        <Listbox
                          value={selectedSubCategory}
                          onChange={(val) => {
                            setSelectedSubCategory(val);
                            scroller.scrollTo(val.name, {
                              duration: 1500,
                              delay: 100,
                              smooth: true,
                              offset: -220, // Scrolls to element - 220 pixels up the page
                            });
                          }}
                        >
                          <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default shadow-md bg-gray-100 py-3 pl-6 pr-10 text-left  focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                              <span className="block  text-sm md:text-base text-[#757575] tracking-widest font-semibold uppercase gt-walshe-reg truncate">
                                {selectedSubCategory?.name}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 top-4 items-center pr-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-black"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>

                            <Transition
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                {menuItem.categories.map(
                                  (subCatName, catIdx) => (
                                    <Listbox.Option
                                      key={catIdx}
                                      className={({ active }) =>
                                        `relative cursor-default gt-walshe-reg truncate select-none text-sm md:text-base py-2 pl-10 pr-4 ${
                                          active
                                            ? "bg-gray-100 text-black"
                                            : "text-gray-900"
                                        }`
                                      }
                                      value={subCatName}
                                    >
                                      {({ selected }) => (
                                        <>
                                          <span
                                            className={`block truncate ${
                                              selected
                                                ? "font-medium"
                                                : "font-normal"
                                            }`}
                                          >
                                            {subCatName?.name}
                                          </span>
                                          {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-black">
                                              <CheckIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                              />
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  )
                                )}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                      </div>
                    </div>

                    <div className="lg:w-10/12 px-6 lg:px-0">
                      {menuItem.categories.length > 0 ? (
                        <>
                          {menuItem.categories.map((cat, j) => (
                            <div
                              id={cat.name}
                              title={cat.name}
                              className="mt-8 lg:mt-8"
                              key={j}
                            >
                              <Element name={cat.name}>
                                <div className="flex justify-between border-l-4 border-red-600 py-2 px-3">
                                  <h3
                                    className="uppercase tracking-widest text-xl m-0" style={{ whiteSpace: 'pre-wrap' }}
                                    dangerouslySetInnerHTML={{
                                      __html: cat.name,
                                    }}
                                  />
                                </div>

                                {cat.items.length > 0 ? (
                                  cat.is_pizza ? (
                                    <div>
                                      <div className="flex justify-end space-x-[14px] md:space-x-[26px] font-bold text-xs md:text-base pr-3 sticky bg-white py-2 top-[188px] lg:top-[148px]">
                                        <span className="w-7 text-center">
                                          T
                                        </span>
                                        <span className="w-10">0.5m</span>
                                        <span className="w-7">1m</span>
                                        <span className="w-7">2m</span>
                                        <span className="w-7">3m</span>
                                      </div>

                                      <ul className="mt-4 md:mt-6 gap-6 grid grid-cols-1items-stretch justify-items-stretch">
                                        {cat.items.map((item, k) => (
                                          <li
                                            key={k}
                                            className="text-black-light menu-box overflow-hidden border border-gray-100 relative"
                                          >
                                            <div className="flex flex-col-reverse md:flex-row sm:space-x-1">
                                              <div className="item-image min-w-[105px] w-full md:w-40 md:min-w-[145px] md:h-40">
                                                <img
                                                  src={item?.acf?.item_image}
                                                  width={200}
                                                  height={220}
                                                  className="w-full h-48 md:h-44 !min-h-[140px] md:!min-h-[160px] object-cover"
                                                  alt={item?.post_title}
                                                />
                                              </div>

                                              <div className="w-full flex flex-col justify-between">
                                                <div className="h-full">
                                                  <div className="items-start flex  justify-between space-x-2 px-3  pb-1 pt-3 pb-1.5">
                                                    <div className="right-aside flex items-start">
                                                      <h4 className="item-name capitalize text-black text-[18px] md:text-xl">
                                                        {item?.post_title}
                                                      </h4>
                                                    </div>

                                                    <div className="left-aside">
                                                      <div className="flex justify-end space-x-4 md:space-x-7 font-medium inner_left item-price text-red-600 text-xs md:text-lg">
                                                        <span className="w-7">
                                                          {item?.acf
                                                            ?.traditional_price
                                                            ? `$${item?.acf?.traditional_price}`
                                                            : `-`}
                                                        </span>
                                                        <span className="w-7">
                                                          {item?.acf?.m05_price
                                                            ? `$${item?.acf?.m05_price}`
                                                            : `-`}
                                                        </span>
                                                        <span className="w-7">
                                                          {item?.acf?.m1_price
                                                            ? `$${item?.acf?.m1_price}`
                                                            : `-`}
                                                        </span>
                                                        <span className="w-7">
                                                          {item?.acf?.m2_price
                                                            ? `$${item?.acf?.m2_price}`
                                                            : `-`}
                                                        </span>
                                                        <span className="w-7">
                                                          {item?.acf?.m3_price
                                                            ? `$${item?.acf?.m3_price}`
                                                            : `-`}
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </div>

                                                  <div
                                                    className="item-ingri px-3 pb-3 md:w-96"
                                                    style={{ whiteSpace: 'pre-wrap' }}
                                                    dangerouslySetInnerHTML={{
                                                      __html:
                                                        item?.post_content,
                                                    }}
                                                  />
                                                </div>
                                                <div className="height relative ">
                                                  <div className="absolute right-0 bottom-0 justify-end space-x-2 px-3 pt-3">
                                                    <div className="left-aside">
                                                      <div className="inner_left flex">
                                                        {item?.acf
                                                          ?.is_vegan && (
                                                          <img
                                                            src="/img/icon/symbol-vegan.svg"
                                                            className="w- h-6 ml-1"
                                                          />
                                                        )}
                                                        {item?.acf?.is_gf && (
                                                          <img
                                                            src="/img/icon/symbol-gf.svg"
                                                            className="w- h-6 ml-1"
                                                          />
                                                        )}
                                                        {item?.acf?.is_veg && (
                                                          <img
                                                            src="/img/icon/symbol-veg.svg"
                                                            className="w- h-6 ml-1"
                                                          />
                                                        )}
                                                        {item?.acf
                                                          ?.is_signature && (
                                                          <img
                                                            src="/img/icon/symbol-crinitis-fav.svg"
                                                            className="w- h-6 ml-1"
                                                          />
                                                        )}
                                                        {item?.acf
                                                          ?.is_spicy_dish && (
                                                          <img
                                                            src="/img/icon/chili-pepper.svg"
                                                            className="w- h-6 ml-1"
                                                          />
                                                        )}
                                                        {item?.acf
                                                          ?.is_contains_nuts && (
                                                          <img
                                                            src="/img/icon/contains_nuts.png"
                                                            className="w- h-6 ml-1"
                                                          />
                                                        )}
                                                        {item?.acf
                                                          ?.is_contains_pork && (
                                                          <img
                                                            src="/img/icon/contains_pork.png"
                                                            className="w- h-6 ml-1"
                                                          />
                                                        )}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ) : cat.is_classic_drink ? (
                                    <div>
                                      <div className="flex justify-end items-end space-x-[14px] md:space-x-[26px] md:-mt-1 font-bold text-xs md:text-base pr-3 sticky bg-white pt-2 top-[188px] lg:top-[148px]">
                                        <span className="w-7 md:w-10 text-center uppercase ddin text-[11px] md:text-xs">
                                          <img
                                            src="/img/icon/300.png"
                                            className="w-7 md:w-12"
                                            alt="300 Ml"
                                          />
                                          <span>300ML</span>
                                        </span>
                                        <span className="w-7 md:w-10 text-center uppercase ddin text-[11px] md:text-xs">
                                          <img
                                            src="/img/icon/500.png"
                                            className="w-7 md:w-12"
                                            alt="500 Ml"
                                          />
                                          <span>500ML</span>
                                        </span>
                                        <span className="w-7 md:w-10 text-center uppercase ddin text-[11px] md:text-xs">
                                          <img
                                            src="/img/icon/1ltr.png"
                                            className="w-7 md:w-12"
                                            alt="1 ltr"
                                          />
                                          <span>1L</span>
                                        </span>
                                        <span className="w-7 md:w-10 text-center uppercase ddin text-[11px] md:text-xs">
                                          <img
                                            src="/img/icon/3ltr.png"
                                            className="w-7 md:w-12"
                                            alt="3 ltr"
                                          />
                                          <span>3L</span>
                                        </span>
                                        <span className="w-7 md:w-10 text-center uppercase ddin text-[11px] md:text-xs">
                                          <img
                                            src="/img/icon/5ltr.png"
                                            className="w-7 md:w-12"
                                            alt="5 ltr"
                                          />
                                          <span>5L</span>
                                        </span>
                                      </div>

                                      <ul className="mt-2 md:mt-6 gap-6 grid grid-cols-1items-stretch justify-items-stretch">
                                        {cat.items.map((item, k) => (
                                          <li
                                            key={k}
                                            className="text-black-light menu-box overflow-hidden border border-gray-100 relative"
                                          >
                                            <div className="flex flex-col-reverse md:flex-row sm:space-x-1">
                                              <div className="item-image min-w-[105px] w-full md:w-40 md:min-w-[145px] md:h-40">
                                                <img
                                                  src={item?.acf?.item_image}
                                                  width={200}
                                                  height={220}
                                                  className="w-full h-48 md:h-44 !min-h-[140px] md:!min-h-[160px] object-cover"
                                                  alt={item?.post_title}
                                                />
                                              </div>

                                              <div className="w-full flex flex-col justify-between">
                                                <div className="h-full">
                                                  <div className="items-start flex  justify-between space-x-2 px-3 pt-3 pb-1.5">
                                                    <div className="right-aside flex items-start">
                                                      <h4 className="item-name capitalize text-black text-[18px] md:text-xl">
                                                        {item?.post_title}
                                                      </h4>
                                                    </div>

                                                    <div className="left-aside">
                                                      <div className="flex justify-end text-center space-x-[14px] md:space-x-7 font-medium inner_left item-price text-red-600 text-[13px] md:text-lg">
                                                        <span className="w-7 md:w-10">
                                                          {item?.acf
                                                            ?.ml300_price
                                                            ? `$${item?.acf?.ml300_price}`
                                                            : `-`}
                                                        </span>
                                                        <span className="w-7 md:w-10">
                                                          {item?.acf
                                                            ?.ml500_price
                                                            ? `$${item?.acf?.ml500_price}`
                                                            : `-`}
                                                        </span>
                                                        <span className="w-7 md:w-10">
                                                          {item?.acf?.l1_price
                                                            ? `$${item?.acf?.l1_price}`
                                                            : `-`}
                                                        </span>
                                                        <span className="w-7 md:w-10">
                                                          {item?.acf?.l3_price
                                                            ? `$${item?.acf?.l3_price}`
                                                            : `-`}
                                                        </span>
                                                        <span className="w-7 md:w-10">
                                                          {item?.acf?.l5_price
                                                            ? `$${item?.acf?.l5_price}`
                                                            : `-`}
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </div>

                                                  <div
                                                    className="item-ingri px-3 pb-3 md:w-96"
                                                    style={{ whiteSpace: 'pre-wrap' }}
                                                    dangerouslySetInnerHTML={{
                                                      __html:
                                                        item?.post_content,
                                                    }}
                                                  />
                                                </div>
                                                <div className="height relative ">
                                                  <div className="absolute right-0 bottom-0 justify-end space-x-2 px-3 pt-3">
                                                    <div className="left-aside">
                                                      <div className="inner_left flex">
                                                        {item?.acf
                                                          ?.is_vegan && (
                                                          <img
                                                            src="/img/icon/symbol-vegan.svg"
                                                            className="w- h-6 ml-1"
                                                          />
                                                        )}
                                                        {item?.acf?.is_gf && (
                                                          <img
                                                            src="/img/icon/symbol-gf.svg"
                                                            className="w- h-6 ml-1"
                                                          />
                                                        )}
                                                        {item?.acf?.is_veg && (
                                                          <img
                                                            src="/img/icon/symbol-veg.svg"
                                                            className="w- h-6 ml-1"
                                                          />
                                                        )}
                                                        {item?.acf
                                                          ?.is_signature && (
                                                          <img
                                                            src="/img/icon/symbol-crinitis-fav.svg"
                                                            className="w- h-6 ml-1"
                                                          />
                                                        )}
                                                        {item?.acf
                                                          ?.is_spicy_dish && (
                                                          <img
                                                            src="/img/icon/chili-pepper.svg"
                                                            className="w- h-6 ml-1"
                                                          />
                                                        )}
                                                        {item?.acf
                                                          ?.is_contains_nuts && (
                                                          <img
                                                            src="/img/icon/contains_nuts.png"
                                                            className="w- h-6 ml-1"
                                                          />
                                                        )}
                                                        {item?.acf
                                                          ?.is_contains_pork && (
                                                          <img
                                                            src="/img/icon/contains_pork.png"
                                                            className="w- h-6 ml-1"
                                                          />
                                                        )}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ) : cat.is_drink ? (
                                    <div>
                                      <div className="flex justify-end items-end space-x-[14px] md:space-x-[26px] md:-mt-1 font-bold text-xs md:text-base pr-3 sticky bg-white pb-1 pt-2 top-[188px] lg:top-[148px]">
                                        <span className="w-7 md:w-10 text-center uppercase ddin text-[11px] md:text-xs">
                                          <img
                                            src="/img/icon/wine-glass.png"
                                            className="w-7 md:w-12"
                                            alt="300 Ml"
                                          />
                                        </span>
                                        <span className="w-7 md:w-10 text-center uppercase ddin text-[11px] md:text-xs">
                                          <img
                                            src="/img/icon/wine-bottle.png"
                                            className="w-7 md:w-12"
                                            alt="500 Ml"
                                          />
                                        </span>
                                      </div>

                                      <ul className="mt-2 md:mt-6 gap-6 grid grid-cols-1items-stretch justify-items-stretch">
                                        {cat.items.map((item, k) => (
                                          <li
                                            key={k}
                                            className="text-black-light menu-box overflow-hidden border border-gray-100 relative"
                                          >
                                            <div className="flex flex-col-reverse md:flex-row sm:space-x-1">
                                              <div className="item-image min-w-[105px] w-full md:w-40 md:min-w-[145px] md:h-40">
                                                <img
                                                  src={item?.acf?.item_image}
                                                  width={200}
                                                  height={220}
                                                  className="w-full h-48 md:h-44 !min-h-[140px] md:!min-h-[160px] object-cover"
                                                  alt={item?.post_title}
                                                />
                                              </div>

                                              <div className="w-full flex flex-col justify-between">
                                                <div className="h-full">
                                                  <div className="items-start flex  justify-between space-x-2 px-3 pt-3 pb-1.5">
                                                    <div className="right-aside flex items-start">
                                                      <h4 className="item-name capitalize text-black text-[18px] md:text-xl">
                                                        {item?.post_title}
                                                      </h4>
                                                    </div>

                                                    <div className="left-aside">
                                                      <div className="flex justify-end text-center space-x-[14px] md:space-x-7 font-medium inner_left item-price text-red-600 text-[13px] md:text-lg">
                                                        <span className="w-7 md:w-10">
                                                          {item?.acf
                                                            ?.glass_price
                                                            ? `$${item?.acf?.glass_price}`
                                                            : `-`}
                                                        </span>
                                                        <span className="w-7 md:w-10">
                                                          {item?.acf
                                                            ?.bottle_price
                                                            ? `$${item?.acf?.bottle_price}`
                                                            : `-`}
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </div>

                                                  <div
                                                    className="item-ingri px-3 pb-3 md:w-96"
                                                    style={{ whiteSpace: 'pre-wrap' }}
                                                    dangerouslySetInnerHTML={{
                                                      __html:
                                                        item?.post_content,
                                                    }}
                                                  />
                                                </div>
                                                <div className="height relative ">
                                                  <div className="absolute right-0 bottom-0 justify-end space-x-2 px-3 pt-3">
                                                    <div className="left-aside">
                                                      <div className="inner_left flex">
                                                        {item?.acf
                                                          ?.is_vegan && (
                                                          <img
                                                            src="/img/icon/symbol-vegan.svg"
                                                            className="w- h-6 ml-1"
                                                          />
                                                        )}
                                                        {item?.acf?.is_gf && (
                                                          <img
                                                            src="/img/icon/symbol-gf.svg"
                                                            className="w- h-6 ml-1"
                                                          />
                                                        )}
                                                        {item?.acf?.is_veg && (
                                                          <img
                                                            src="/img/icon/symbol-veg.svg"
                                                            className="w- h-6 ml-1"
                                                          />
                                                        )}
                                                        {item?.acf
                                                          ?.is_signature && (
                                                          <img
                                                            src="/img/icon/symbol-crinitis-fav.svg"
                                                            className="w- h-6 ml-1"
                                                          />
                                                        )}
                                                        {item?.acf
                                                          ?.is_spicy_dish && (
                                                          <img
                                                            src="/img/icon/chili-pepper.svg"
                                                            className="w- h-6 ml-1"
                                                          />
                                                        )}
                                                        {item?.acf
                                                          ?.is_contains_nuts && (
                                                          <img
                                                            src="/img/icon/contains_nuts.png"
                                                            className="w- h-6 ml-1"
                                                          />
                                                        )}
                                                        {item?.acf
                                                          ?.is_contains_pork && (
                                                          <img
                                                            src="/img/icon/contains_pork.png"
                                                            className="w- h-6 ml-1"
                                                          />
                                                        )}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ) : (
                                    <ul className="mt-4 md:mt-6 gap-6 grid md:grid-cols-2  2xl:grid-cols-3 items-stretch justify-items-stretch">
                                      {cat.items.map((item, k) => (
                                        <li
                                          key={k}
                                          className="text-black-light menu-box overflow-hidden border border-gray-100 relative"
                                        >
                                          <div className="flex sm:space-x-1 h-full">
                                            <div className="item-image w-40 min-w-[145px] h-40">
                                              <img
                                                src={item?.acf?.item_image}
                                                width={200}
                                                height={220}
                                                className="w-full h-44 !min-h-[160px] object-cover"
                                                alt={item?.post_title}
                                              />
                                            </div>

                                            <div className="w-full flex flex-col justify-between h-full ">
                                              <div className="h-full">
                                                <div className="items-start flex  justify-between space-x-2 px-3 pt-3 pb-1.5">
                                                  <div className="right-aside flex items-start">
                                                    <h4 className="item-name capitalize text-black text-[18px] md:text-xl">
                                                      {item?.post_title}
                                                    </h4>
                                                  </div>

                                                  <div className="left-aside">
                                                    <div className="inner_left">
                                                      <h5 className="item-price text-red-600 text-base md:text-lg">
                                                        ${item?.acf?.item_price}
                                                      </h5>
                                                    </div>
                                                  </div>
                                                </div>

                                                <div
                                                  className="item-ingri px-3 pb-3"
                                                  style={{ whiteSpace: 'pre-wrap' }}
                                                  dangerouslySetInnerHTML={{
                                                    __html: item?.post_content,
                                                  }}
                                                />
                                              </div>
                                              <div className="height relative ">
                                                <div className="absolute right-0 bottom-0 justify-end space-x-2 px-3 pt-3 pb-2">
                                                  <div className="left-aside">
                                                    <div className="inner_left flex">
                                                      {item?.acf?.is_vegan && (
                                                        <img
                                                          src="/img/icon/symbol-vegan.svg"
                                                          className="w- h-6 ml-1"
                                                        />
                                                      )}
                                                      {item?.acf?.is_gf && (
                                                        <img
                                                          src="/img/icon/symbol-gf.svg"
                                                          className="w- h-6 ml-1"
                                                        />
                                                      )}
                                                      {item?.acf?.is_veg && (
                                                        <img
                                                          src="/img/icon/symbol-veg.svg"
                                                          className="w- h-6 ml-1"
                                                        />
                                                      )}
                                                      {item?.acf
                                                        ?.is_signature && (
                                                        <img
                                                          src="/img/icon/symbol-crinitis-fav.svg"
                                                          className="w- h-6 ml-1"
                                                        />
                                                      )}
                                                      {item?.acf
                                                        ?.is_spicy_dish && (
                                                        <img
                                                          src="/img/icon/chili-pepper.svg"
                                                          className="w- h-6 ml-1"
                                                        />
                                                      )}
                                                      {item?.acf
                                                        ?.is_contains_nuts && (
                                                        <img
                                                          src="/img/icon/contains_nuts.png"
                                                          className="w- h-6 ml-1"
                                                        />
                                                      )}
                                                      {item?.acf
                                                          ?.is_contains_pork && (
                                                          <img
                                                            src="/img/icon/contains_pork.png"
                                                            className="w- h-6 ml-1"
                                                          />
                                                        )}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  )
                                ) : (
                                  <div className="item-name capitalize font-bold text-black bg-[#f9f9f9] p-6 mt-4 text-center">
                                    <p className=" text-[18px] md:text-xl">
                                      No item found
                                    </p>
                                  </div>
                                )}
                              </Element>
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className="item-name capitalize font-bold text-black bg-[#f9f9f9] p-6 mt-4 text-center">
                          <p className=" text-[18px] md:text-xl">
                            No item found
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}
