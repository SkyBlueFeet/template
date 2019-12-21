export default {
    add: ele => ` <button id="${ele.elementId}" name="${ele.name}" class="btn btn-outline-primary" data-toggle="modal" data-whatever="@add" data-target="#adminModal">${ele.elementName}</button> `,

    edit: ele => ` <button id="${ele.elementId}" class="btn btn-outline-primary" data-toggle="modal" data-whatever="@edit" data-target="#adminModal" disabled>${ele.elementName}</button> `,

    delete: ele => ` <button id="${ele.elementId}" class="btn btn-outline-danger">${ele.elementName}</button> `,

    assign: ele => ` <button id="${ele.elementId}" class="btn btn-outline-primary" data-toggle="modal" data-whatever="@assign" data-target="#assignModal" disabled>${ele.elementName}</button> `,

    defaultBtn: ele => ` <button id="${ele.elementId}" class="btn btn-outline-primary">${ele.elementName}</button> `,

    userFuncLink: ele => `<a href="/" class="dropdown-item"><i class="ni ni-single-02"></i><span>${ele.elementName}</span>
</a>`
};