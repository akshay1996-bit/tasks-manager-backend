class validator {
  static validTaskData(newTask) {
    const validPriority = ["low", "medium", "high"];
    if (
      newTask.hasOwnProperty("title") &&
      newTask.hasOwnProperty("description") &&
      newTask.hasOwnProperty("isComplete") &&
      newTask.hasOwnProperty("priority") &&
      typeof newTask.isComplete == "boolean" &&
      typeof newTask.title == "string" &&
      typeof newTask.description == "string" &&
      validPriority.includes(newTask.priority)
    ) {
      if (newTask.title && newTask.description) {
        return {
          status: true,
          message: "Task added successfully",
        };
      }else{
        return {
          status: false,
          message: "title or description can't be empty",
        };
      }
    } else {
      return {
        status: false,
        message: "Malformed data, provide all properties",
      };
    }
  }

  static validateId(id, taskData) {
    let valueFound = taskData.some((item) => item.id == id);
    if (valueFound) return true;
    return false;
  }

  static isValidPriority(priority) {
    const validPriority = ["low", "medium", "high"];
    let isValid = validPriority.includes(priority);
    return isValid;
  }
}

module.exports = validator;
