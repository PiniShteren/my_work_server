module.exports = {
    usersObject: (response) => {
        return {
            id: response._id,
            first_name: response.first_name,
            last_name: response.last_name,
            email: response.email,
            permission: response.permission,
            profile_image: response.profile_image,
            phone_number: response.phone_number,
            roles: response.roles,
            id_number: response.id_number
        }
    },
    userObject: (response) => {
        return {
            id: response._id,
            first_name: response.first_name,
            last_name: response.last_name,
            email: response.email,
            permission: response.permission,
            profile_image: response.profile_image,
            phone_number: response.phone_number,
            id_number: response.id_number,
            roles: response.roles,
            sessionKey: response.sessionKey,
        }
    },
    roleObject: (response) => {
        return {
            id: response.id,
            name: response.name,
            sub_department_id: response.sub_department_id,
        }
    },
    subDepartmentObject: (response) => {
        return {
            id: response.id,
            name: response.name,
            department_id: response.department_id,
        }
    },
    departmentObject: (response) => {
        return {
            id: response.id,
            name: response.name,
        }
    },
    taskObject: (response) => {
        return {

        }
    }
}