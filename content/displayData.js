//this whole part is done without much thought or care... I'm learning that HTML/CSS is extremely boring

export class displayData{
    constructor(){
        this._div = document.createElement('div');
        this._div.style = "left: 25px;" + "right: 25px;" + "height: 120px;" + "bottom: 25px;" + "background-color:#b0e0e6;" +
            "z-index: 10;" + "position: fixed;" + "padding: 10px" + "overflow-x:auto;";

        this._table = document.createElement('table');
        this._headerRow = document.createElement('tr');
        this._dataRow = document.createElement('tr');
        this._linkRow = document.createElement('tr');

        this._table.append(this._headerRow);
        this._table.append(this._dataRow);
        this._table.append(this._linkRow);
        this._div.appendChild(this._table);
        document.body.appendChild(this._div);
    }

    displayCourse(courseData){
        let header = document.createElement('th');
        header.innerHTML = courseData.course;
        this._headerRow.appendChild(header);

        let data = document.createElement('td');
        data.innerHTML = this._formatCourseData(courseData);
        this._dataRow.appendChild(data);

        let link = document.createElement('a');
        link.href = courseData.url;
        link.target = "_blank";
        link.innerHTML = "Click here to find out more at CourseDiggers.com";
        let linkData = document.createElement('td');
        linkData.appendChild(link);
        this._linkRow.appendChild(linkData);

    }

    _formatCourseData(courseData){
        let formatted = "";
        if (!(courseData.data.difficulty === null || courseData.data.difficulty === 'N/A')){
            formatted += "Difficulty: " + courseData.data.difficulty + "/5; ";
        }

        if (!(courseData.data.dig === null || courseData.data.ig === 'N/A')){
            formatted += "Dig: " + courseData.data.dig + "; ";
        }

        if (!(courseData.data.fail_rate === null || courseData.data.fail_rate === 'N/A')){
            formatted += "Fail Rate: " + courseData.data.fail_rate + "; ";
        }

        if (!(courseData.data.grade === null || courseData.data.grade === 'N/A')){
            formatted += "Median Grade: " + courseData.data.grade + "; ";
        }

        if (!(courseData.data.workload === null || courseData.data.workload === 'N/A')){
            formatted += "Workload: " + courseData.data.workload + "/5; ";
        }
        return formatted;
    }

    displayProfs(profsData){
        profsData.forEach(profData => {
            let header = document.createElement('th');
            header.innerHTML = profData.name;
            this._headerRow.appendChild(header);

            let data = document.createElement('td');
            data.innerHTML = this._formatProfData(profData);
            this._dataRow.appendChild(data);

            let link = document.createElement('a');
            link.href = profData.url;
            link.target = "_blank";
            link.innerHTML = "Click here to find out more at RateMyProfessors.com";
            let linkData = document.createElement('td');
            linkData.appendChild(link);
            this._linkRow.appendChild(linkData);
        })
    }

    _formatProfData(profData){
        let formatted = "";
        if (!(profData.data.difficulty === "N/A" || profData.data.difficulty === null)){
            formatted += "Difficulty: " + profData.data.difficulty + "/5; ";
        }
        if (!(profData.data.quality === "N/A" || profData.data.quality === null)){
            formatted += "Quality: " + profData.data.quality + "/5; ";
        }
        if (!(profData.data.take_again === "N/A" || profData.data.take_again === null)){
            formatted += "Take Again: " + profData.data.take_again + "; ";
        }
        return formatted;
    }
}