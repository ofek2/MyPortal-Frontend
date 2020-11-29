import idf from '../../assets/images/idf.png';
import kitbag from '../../assets/images/kitbag.png';
import madim from '../../assets/images/madim.png';
import cactus from '../../assets/images/cactus.png';

interface ILink {
    name: string,
    url: string,
    image: any
}

const applinks: ILink[] = [
    {
        name: "אתר המילואים",
        url: "https://www.miluim.idf.il",
        image: idf
    },
    {
        name: 'הצב"ר',
        url: "https://clearance.medical.idf.il",
        image: cactus
    },
    {
        name: "קיטבג",
        url: "https://kitbag.prat.idf.il/",
        image: kitbag
    },
    {
        name: "מדים אקספרס",
        url: "https://madim.prat.idf.il",
        image: madim
    },
]

export default applinks;