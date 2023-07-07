import axios from "axios";

export async function getAllProjects(userId) {
    try {
        const response = await axios.get(`http://localhost:8080/projects?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}

export async function createProject(userId, title) {
    const request = {
        "userId": userId,
        "title": title,
    }

    const response = await axios.post("http://localhost:8080/projects", request)
    return response.status
}

export async function getAllTables(projectId) {
    try {
        const response = await axios.get(`http://localhost:8080/tables?id=${projectId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}

export async function getTable(projectId, name) {
    try {
        const response = await axios.get(`http://localhost:8080/tables/content?projectId=${projectId}&tableName=${name}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}

export async function createTable(projectId, title, columns) {
    title = title.trim()
    title = title.toLowerCase()
    title = title.replace(/[^a-zA-Z0-9]/g, '');
    title = title.replaceAll(' ', '_')

    for(var i=0; i<columns.length; i++){
        var element = columns[i].columnName
        element = element.trim()
        element = element.toLowerCase()
        element = element.replace(/[^a-zA-Z0-9]/g, '');
        element = element.replaceAll(' ', '_')
        columns[i].columnName = element;
    }

    const request = {
        "projectId": projectId,
        "title": title,
        "columns": columns
    }

    const response = await axios.post("http://localhost:8080/tables", request)
    return response.status
}

export async function getEnpoints(projectId) {
    try {
        const response = await axios.get(`http://localhost:8080/endpoint/list?projectId=${projectId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}

export async function getApiKey(projectId) {
    try {
        const response = await axios.get(`http://localhost:8080/projects/api-key?projectId=${projectId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}

export async function getProjectContent(projectId) {
    let data = {}

    try {
        data = await getAllTables(projectId);

        const content = []

        for (const i in data.tables) {
            try {
                content.push(await getTable(projectId, data.tables[i]));
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        }

        data.tables = content;
        return data;
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}

export async function createEndpoint(table, type, query, url, projectId, userId) {
    const request = {
        "type": type,
        "query": query,
        "url": url,
        "table": table,
        "projectId": projectId,
        "userId": userId
    }

    const response = await axios.post("http://localhost:8080/endpoint/create", request)
    return response.status
}