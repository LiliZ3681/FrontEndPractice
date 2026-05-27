const TodoList = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
            <tr>
            <th>Name</th>
            <th>Favorite Color</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
            <tr className="hover:bg-base-300">
            <td>Cy Ganderton</td>
            <td>Blue</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
