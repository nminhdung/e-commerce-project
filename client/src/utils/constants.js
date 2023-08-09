import path from "./paths";
import icons from "./icons";

export const navigation = [
  {
    id: 1,
    value: "HOME",
    path: `/${path.HOME}`,
  },
  {
    id: 2,
    value: "PRODUCTS",
    path: `/${path.PRODUCTS}`,
  },

  {
    id: 3,
    value: "BLOGS",
    path: `/${path.BLOGS}`,
  },
  {
    id: 4,
    value: "OUR SERVICES",
    path: `/${path.OUR_SERVICES}`,
  },
  {
    id: 5,
    value: "FAQ",
    path: `/${path.FAQ}`,
  },
];

const {
  BsShieldShaded,
  FaTruck,
  GiReturnArrow,
  RiGiftFill,
  FaBlenderPhone,
  MdDashboard,
  MdGroups,
  FaProductHunt,
} = icons;
export const extraInfo = [
  {
    id: 1,
    title: "guarantee",
    subTitle: "Quality checked",
    icon: <BsShieldShaded />,
  },
  {
    id: 2,
    title: "Free Shipping",
    subTitle: "Free on all products",
    icon: <FaTruck />,
  },
  {
    id: 3,
    title: "Special gift cards",
    subTitle: "Special gift cards",
    icon: <RiGiftFill />,
  },
  {
    id: 4,
    title: "Free return",
    subTitle: "Within 7 days",
    icon: <FaBlenderPhone />,
  },
  {
    id: 5,
    title: "Consultancy",
    subTitle: "Lifetime 24/7/356",
    icon: <GiReturnArrow />,
  },
];
export const productInfo = [
  {
    id: 1,
    title: "description",
  },
  {
    id: 2,
    title: "warranty",
    content: `
    Warranty Information
    
    LIMITED WARRANTIES
    Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:
    
    Frames Used In Upholstered and Leather Products
    Limited Lifetime Warranty
    A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.
    `,
  },
  {
    id: 3,
    title: "delivery",
    content: `Purchasing & Delivery
    Before you make your purchase, it's helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
    Picking up at the store
    Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
    Delivery
    Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
    In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above. `,
  },
  {
    id: 4,
    title: "payment",
    content: `Purchasing & Delivery
    Before you make your purchase, it's helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
    Picking up at the store
    Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
    Delivery
    Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
    In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above. `,
  },
];
export const colors = [
  "gray",
  "white",
  "black",
  "red",
  "brown",
  "gold",
  "mineral",
];
export const sorts = [
  {
    id: 1,
    type: "-sold",
    display: "best selling",
  },
  {
    id: 2,
    type: "title",
    display: "Alphabetically, A-Z",
  },
  {
    id: 3,
    type: "-title",
    display: "Alphabetically, Z-A",
  },
  {
    id: 4,
    type: "-price",
    display: "Price, high to low",
  },
  {
    id: 5,
    type: "price",
    display: "Price, low to high",
  },
];
export const voteOptions = [
  {
    id: 1,
    text: "Terrible",
  },
  {
    id: 2,
    text: "Bad",
  },
  {
    id: 3,
    text: "Normal",
  },
  {
    id: 4,
    text: "Good",
  },
  {
    id: 5,
    text: "Perfect",
  },
];
export const adminSidebarList = [
  {
    id: 1,
    type: "single",
    text: "Dashboard",
    path: `/${path.ADMIN}/${path.DASHBOARD}`,
    icon: <MdDashboard />,
  },
  {
    id: 2,
    type: "single",
    text: "Manage User",
    path: `/${path.ADMIN}/${path.MANAGE_USERS}`,
    icon: <MdGroups />,
    // submenu: [
    //   {
    //     text: "Create Product",
    //     path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`,
    //   },
    //   {
    //     text: "Manage Users",
    //     path: `/${path.ADMIN}/${path.MANAGE_USERS}`,
    //   },
    // ],
  },
  {
    id: 3,
    type: "parent",
    text: "Manage Products",
    path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`,
    icon: <FaProductHunt />,

    submenu: [
      {
        text: "Create Product",
        path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`,
      },
      {
        text: "Manage Products",
        path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`,
      },
    ],
  },
];
export const roles = [
  {
    code: 12,
    value: "admin",
  },
  {
    code: 13,
    value: "user",
  },
];
export const blockStatus = [
  {
    code: true,
    value: "Blocked",
  },
  {
    code: false,
    value: "Active",
  },
];
export const MemberSidebarList = [
  {
    id: 1,
    type: "single",
    text: "Personal",
    path: `/${path.MEMBER}/${path.PERSONAL}`,
    icon: <MdDashboard />,
  },
  {
    id: 2,
    type: "single",
    text: "My Cart",
    path: `/${path.MEMBER}/${path.CART}`,
    icon: <MdGroups />,
    // submenu: [
    //   {
    //     text: "Create Product",
    //     path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`,
    //   },
    //   {
    //     text: "Manage Users",
    //     path: `/${path.ADMIN}/${path.MANAGE_USERS}`,
    //   },
    // ],
  },
  
];