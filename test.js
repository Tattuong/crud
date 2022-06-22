const users = [
  {
    id: 1,
    name: "Tony",
    age: 12,
  },
  {
    id: 2,
    name: "Tuong",
    age: 25,
  },
  {
    id: 3,
    name: "SL",
    age: 25,
  },
];

// 1. Tim kiem 1 phan tu trong mang boi id = 3

// 2. Loc ra nhung users co age = 25

// 3. Xoa 1 phan tu trong mang boi id = 2

// 4. Xoa nhung users ma co ids nam trong list [2, 3]

// 5. Tang do tuoi len age +1 cho user SL

const searchId = () => {
  const newArray = users.find((user) => user.id === 3);
  console.log(newArray);
};
// 2
const filterId = () => {
  const newArray1 = users.filter((user) => user.age === 25);
  console.log(newArray1);
};
//3
const deleteId = () => {
  const newArray2 = users.filter((user) => user.id !== 2);
  console.log(newArray2);
};

//4

let ids = [1, 3];
const deleteIds = () => {
  const newArray3 = users.filter((user) => !ids.includes(user.id));
  console.log(newArray3);
};
//5

const mapUser = () => {
  // const newArray4 = users.map((user) => user.age = user.age +1 )
  const newArray4 = users.map((user) =>
    user.id === 3
      ? {
          ...user,
          age: user.age + 1,
        }
      : user
  );

  console.log(newArray4);
};
const start = () => {
  searchId();
  filterId();
  deleteId();
  deleteIds();
  mapUser();
};
start();
