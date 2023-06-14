function sortTable(data) {

    let stable = Array.from(document.getElementById("tbl").rows).slice(1);

    // 1 - Name - сортировка по имени 1 ст
    // 2 - Data - по дате 2 ст
    // 3 - Sum - по сумме 3 ст
    let sort1 = data.sort1.value;
    let sort2 = data.sort2.value;
    let sort3 = data.sort3.value;

    // порядок сортировки, 1 - по возрастанию, -1 - по убыванию
    let dir1 = Number(data.dir1.value)-1;
    //alert(dir1);
    let dir2 = Number(data.dir2.value)-1;
    //alert(dir2);
    let dir3 = Number(data.dir3.value)-1;
    //alert(dir3);

    switch (sort1) {
        case "1" :
        switch (sort2) {
            case "0" :
            stable.sort((a,b) => {
                return (dir1*compName(a, b));
            });
            break;
            case "2" :
            if (sort3 == 0)
            stable.sort((a,b) => {
                let s1 = dir1*compName(a, b);
                if (s1 == 0) return (dir2*compData(a, b));
                else return s1;
            });
            else
            stable.sort((a,b) => {
                let s1 = dir1*compName(a, b);
                if (s1 == 0) s1 = dir2*compData(a, b);
                if (s1 == 0) s1 = dir3*compSum(a, b);
                return s1;
            });
            break;
            case "3":
            if (sort3 == 0)
            stable.sort((a,b) => {
                let s1 = dir1*compName(a, b);
                if (s1 == 0) return (dir2*compSum(a, b));
                else return s1;
            });
            else
            stable.sort((a,b) => {
                let s1 = dir1*compName(a, b);
                if (s1 == 0) s1 = dir2*compSum(a, b);
                if (s1 == 0) s1 = dir3*compData(a, b);
                return s1;
            });
        }
        break;
        case "2" :
        switch (sort2) {
            case "1" :
            if (sort3 == 0)
            stable.sort((a,b) => {
                let s1 = dir1*compData(a, b);
                if (s1 == 0) return (dir2*compName(a, b));
                else return s1;
            });
            else
            stable.sort((a,b) => {
                let s1 = dir1*compData(a, b);
                if (s1 == 0) s1 = dir2*compName(a, b);
                if (s1 == 0) s1 = dir3*compSum(a, b);
                return s1;
            });
            break;
            case "0" :
            stable.sort((a,b) => {
                return (dir1*compData(a, b));
            });
            break;
            case "3":
            if (sort3 == 0)
            stable.sort((a,b) => {
                let s1 = dir1*compData(a, b);
                if (s1 == 0) return (dir2*compSum(a, b));
                else return s1;
            });
            else
            stable.sort((a,b) => {
                let s1 = dir1*compData(a, b);
                if (s1 == 0) s1 = dir2*compSum(a, b);
                if (s1 == 0) s1 = dir3*compName(a, b);
                return s1;
            });
        }
        break;
        case "3":
        switch (sort2) {
            case "1" :
            if (sort3 == 0)
            stable.sort((a,b) => {
                let s1 = dir1*compSum(a, b);
                if (s1 == 0) return (dir2*compName(a, b));
                else return s1;
            });
            else
            stable.sort((a,b) => {
                let s1 = dir1*compSum(a, b);
                if (s1 == 0) s1 = dir2*compName(a, b);
                if (s1 == 0) s1 = dir3*compData(a, b);
                return s1;
            });
            break;
            case "2" :
            if (sort3 == 0)
            stable.sort((a,b) => {
                let s1 = dir1*compSum(a, b);
                if (s1 == 0) return (dir2*compData(a, b));
                else return s1;
            });
            else
            stable.sort((a,b) => {
                let s1 = dir1*compSum(a, b);
                if (s1 == 0) s1 = dir2*compData(a, b);
                if (s1 == 0) s1 = dir3*compName(a, b);
                return s1;
            });
            break;
            case "0":
            stable.sort((a,b) => {
                return (dir1*compSum(a, b));
            });
        }
    }

    function compName(a, b) {
        if (a.cells[0].innerHTML < b.cells[0].innerHTML) return -1;
        else if (a.cells[0].innerHTML > b.cells[0].innerHTML) return 1;
        else return 0;
    }

    function compData(a, b) {
        let d1 = Number(a.cells[1].innerHTML.substring(6, 10));
        let d2 =  Number(b.cells[1].innerHTML.substring(6, 10));
        if (d1 < d2) return -1;
        else if (d1 == d2) {
            d1 = Number(a.cells[1].innerHTML.substring(3, 5));
            d2 =  Number(b.cells[1].innerHTML.substring(3, 5));
            if (d1 < d2) return -1;
            else if (d1 == d2) {
                d1 = Number(a.cells[1].innerHTML.substring(0, 2));
                d2 =  Number(b.cells[1].innerHTML.substring(0, 2));
                if (d1 < d2) return -1;
                else if (d1 == d2) return 0;
                else return 1;
                }
            else return 1;
        }
        else return 1;
    }

    function compSum(a, b) {
        return (+Number(a.cells[2].innerHTML) - +Number(b.cells[2].innerHTML));
    }

    document.getElementById("tbl").tBodies[0].append(...stable);
}