import { VscHistory, VscHeart } from "react-icons/vsc";
import { FiUser } from "react-icons/fi";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { LiaHomeSolid } from "react-icons/lia";
import slugify from "slugify";

export const handleSlug = (name: string) => {
    return slugify(name || "", {
        replacement: "-",
        remove: /[*-+~,.()'"!:@]/g,
        lower: true,
        locale: "vi",
        trim: true,
    })
};

export const dataHashTag = ["Top thịnh hành", "Mới Phát Hành", "Top Yêu Thích", "Top Triệu View", "Top Tỉ View"];

export const defaultHashTag = "top-thinh-hanh";

export const formatView = (value: number) => {
    if (value < 1e3) {
        return value.toString();
    } else if (value < 1e6) {
        return (value / 1e3).toFixed(1) + "K";
    } else if (value < 1e9) {
        return (value / 1e6).toFixed(1) + "M";
    } else if (value < 1e12) {
        return (value / 1e9).toFixed(1) + "B";
    } else {
        return (value / 1e12).toFixed(1) + "T";
    }
};

export const ModalTypeEnum = {
    NULL: "NULL",
    ADD: "ADD",
    MODAL_FULL_SCREEN: "MODAL_FULL_SCREEN",
    MODAL_POPUP: "MODAL_POPUP",
};

export const PAGE_ROUTER = {
    HOME: "/",
    FAVORITE: "/favorite",
    UPLOAD: "/upload",
    PLAY_HISTORY: "/play_history",
    PROFILE: "/profile",
    SEARCH: "/search",
    SINGER: "/singer/:name",
}

export const defaultNavMenu = [
    {
        Icon: LiaHomeSolid,
        herf: PAGE_ROUTER.HOME,
        title: "Trang chủ"
    },
    {
        Icon: VscHeart,
        herf: "/favorite",
        title: "Yêu thích"
    },
    {
        Icon: AiOutlineCloudUpload,
        herf: PAGE_ROUTER.UPLOAD,
        title: "Tải lên"
    },
    {
        Icon: VscHistory,
        herf: PAGE_ROUTER.PLAY_HISTORY,
        title: "Đã nghe"
    },
    {
        Icon: FiUser,
        herf: PAGE_ROUTER.PROFILE,
        title: "Cá nhân"
    },
];

export const dataBaner = [
    "https://photo-zmp3.zadn.vn/banner/d/f/4/f/df4f2462b8b2a799caa699572c607282.jpg",
    "https://photo-zmp3.zadn.vn/banner/4/4/6/e/446e888537f27e9e4c569690b90a9bf3.jpg",
    "https://photo-zmp3.zadn.vn/banner/3/3/6/1/3361a0d09d7e557d849df9e3d0424827.jpg",
    "https://photo-zmp3.zadn.vn/banner/0/d/3/1/0d31409262ea007fd8909838ead4ba9a.jpg",
    "https://photo-zmp3.zadn.vn/banner/2/b/3/d/2b3d25f6f1aaa8d6f876a9e58e1338c5.jpg",
    "https://photo-zmp3.zadn.vn/banner/0/d/9/c/0d9ca3f0ae812e94c0fa618b66ac6fa4.jpg"
];

export const dataSinger = [
    {
        img: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/4/6/2/8/4628a1f7125953ab199db90bfac93377.jpg",
        name: "Lê Bảo Bình"
    },
    {
        img: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/c/b/5/2/cb5210a2f85409e2bfb4275b0dfefc26.jpg",
        name: "Jack"
    },
    {
        img: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/d/8/b/4/d8b402fa4d9bcbf11b2c1129dfcf088c.jpg",
        name: "Hồ Quang Hiếu"
    },
    {
        img: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/images/c/b/7/c/cb7c360b0900a51b92442d8b36763e6a.jpg",
        name: "Karik"
    },
    {
        img: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/images/b/4/8/0/b4807a29d5b9f6abb009bed66f81af8d.jpg",
        name: "Alan Walker"
    },
    {
        img: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/a/b/5/2/ab520fed47628f9e2ed3edcc39f404cd.jpg",
        name: "BLACKPINK"
    },
    {
        img: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_jpeg/cover/e/7/7/e/e77e66089e244c0c61188189be25f8ba.jpg",
        name: "Sơn Tùng M-TP"
    },
    {
        img: "https://photo-resize-zmp3.zmdcdn.me/w600_r1x1_jpeg/cover/2/6/c/1/26c183e222c00c5d7e9c9465ad7c058c.jpg",
        name: "Phan Mạnh Quỳnh"
    },
]