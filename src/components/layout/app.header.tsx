import { useState } from 'react';
import { FaFacebook } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi';
import { VscSearchFuzzy } from 'react-icons/vsc';
import { Divider, Badge, Drawer, Avatar, Popover, Empty, Button, Menu } from 'antd';
import { Dropdown, Space } from 'antd';
import { Router, useNavigate } from 'react-router';
import './app.header.scss';
import { Link } from 'react-router-dom';
import { useCurrentApp } from 'components/context/app.context';
import { logoutAPI } from '@/services/api';
import ManageAccount from '../client/account';
import { isMobile } from 'react-device-detect';
import { AppstoreOutlined, HomeOutlined, MailOutlined, PhoneOutlined, SettingOutlined, WifiOutlined } from '@ant-design/icons';
import { FaYoutube } from 'react-icons/fa6';
import { MenuProps } from 'antd/lib';
import { icons } from 'antd/es/image/PreviewGroup';
import { TbSmartHome } from 'react-icons/tb';

interface IProps {
    searchTerm: string;
    setSearchTerm: (v: string) => void;
}

export const AppHeader = (props: IProps) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openManageAccount, setOpenManageAccount] = useState<boolean>(false);

    const {
        isAuthenticated, user, setUser, setIsAuthenticated,
        carts, setCarts
    } = useCurrentApp();

    const navigate = useNavigate();

    const handleLogout = async () => {
        //todo
        const res = await logoutAPI();
        if (res.data) {
            setUser(null);
            setCarts([]);
            setIsAuthenticated(false);
            localStorage.removeItem("access_token");
            localStorage.removeItem("carts");
        }
    }

    let items = [
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => setOpenManageAccount(true)}
            >Quản lý tài khoản</label>,
            key: 'account',
        },
        {
            label: <Link to="/history">Lịch sử mua hàng</Link>,
            key: 'history',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
        },

    ];
    if (user?.role === 'ADMIN') {
        items.unshift({
            label: <Link to='/admin'>Trang quản trị</Link>,
            key: 'admin',
        })
    }

    const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user?.avatar}`;

    const contentPopover = () => {
        return (
            <div className='pop-cart-body'>
                <div className='pop-cart-content'>
                    {carts?.map((book, index) => {
                        return (
                            <div className='book' key={`book-${index}`}>
                                <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book?.detail?.thumbnail}`} />
                                <div>{book?.detail?.mainText}</div>
                                <div className='price'>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(book?.detail?.price ?? 0)}
                                </div>
                            </div>
                        )
                    })}
                </div>
                {carts.length > 0 ?
                    <div className='pop-cart-footer'>
                        <button onClick={() => navigate('/order')}>Xem giỏ hàng</button>
                    </div>
                    :
                    <Empty
                        description="Không có sản phẩm trong giỏ hàng"
                    />
                }
            </div>
        )
    }
    let listCategory_product = [

        {
            label: 'Bộ phát WIFI',
            key: 'wifi',
            icon: <WifiOutlined />,
            children: [
                {
                    label: <Link to="/wifi/1">Wifi Ubiquiti</Link>,
                    key: 'item1',
                },
                {
                    label: <Link to="/wifi/2">Wifi Aruba</Link>,
                    key: 'item2',
                },
                {
                    label: <Link to="/wifi/3">WiFi Everest</Link>,
                    key: 'item3',
                },
                {
                    label: <Link to="/wifi/4">Wifi UniFi</Link>,
                    key: 'item4',
                },
                {
                    label: <Link to="/wifi/5">Wifi TP-Link</Link>,
                    key: 'item5',
                },
                {
                    label: <Link to="/wifi/6">Wifi Mikrotik</Link>,
                    key: 'item6',
                },
                {
                    label: <Link to="/wifi/7">Wifi Meraki</Link>,
                    key: 'item7',
                },
                {
                    label: <Link to="/wifi/8">Wifi Tenda</Link>,
                    key: 'item8',
                },
                {
                    label: <Link to="/wifi/9">Wifi Totolink</Link>,
                    key: 'item9',
                }
            ],

        },
        {
            label: 'Thiết bị cân bằng tải',
            key: 'loadbalancer',
            icon: <WifiOutlined />,
            children: [
                {
                    label: <Link to="/loadbalancer/1">Router MikroTik</Link>,
                    key: 'item11',
                },
                {
                    label: <Link to="/loadbalancer/2">Router TP-Link</Link>,
                    key: 'item12',
                },
                {
                    label: <Link to="/loadbalancer/3">Router Cisco</Link>,
                    key: 'item13',
                },
                {
                    label: <Link to="/loadbalancer/4">Router Fortinet</Link>,
                    key: 'item14',
                },
                {
                    label: <Link to="/loadbalancer/5">Router D-Link</Link>,
                    key: 'item15',
                },

            ],

        },
        {
            label: 'Bộ chuyển mạch Switch',
            key: 'switch',
            icon: <WifiOutlined />,
            children: [
                {
                    label: <Link to="/switch/1">Switch TP-Link</Link>,
                    key: 'item21',
                },
                {
                    label: <Link to="/switch/2">Switch Cisco</Link>,
                    key: 'item22',
                },
                {
                    label: <Link to="/switch/3">Switch D-Link</Link>,
                    key: 'item23',
                },
                {
                    label: <Link to="/switch/4">Switch Netgear</Link>,
                    key: 'item24',
                },
                {
                    label: <Link to="/switch/5">Switch MikroTik</Link>,
                    key: 'item25',
                },

            ],

        },
        {
            label: 'Thiết bị tường lửa Firewall',
            key: 'firewall',
            icon: <WifiOutlined />,
            children: [
                {
                    label: <Link to="/firewall/1">Firewall Fortinet</Link>,
                    key: 'item31',
                },
                {
                    label: <Link to="/firewall/2">Firewall Cisco</Link>,
                    key: 'item32',
                },
                {
                    label: <Link to="/firewall/3">Firewall Palo Alto</Link>,
                    key: 'item33',
                },
                {
                    label: <Link to="/firewall/4">Firewall Sophos</Link>,
                    key: 'item34',
                },
                {
                    label: <Link to="/firewall/5">Firewall SonicWall</Link>,
                    key: 'item35',
                },
            ],

        },
        {
            label: 'Thiết bị smart home',
            key: 'smarthome',
            icon: <HomeOutlined />,
            children: [
                {
                    label: <Link to="/smarthome/1">Smart Home TP-Link</Link>,
                    key: 'item41',
                },
                {
                    label: <Link to="/smarthome/2">Smart Home Xiaomi</Link>,
                    key: 'item42',
                },
                {
                    label: <Link to="/smarthome/3">Smart Home Philips</Link>,
                    key: 'item43',
                },
                {
                    label: <Link to="/smarthome/4">Smart Home Google Nest</Link>,
                    key: 'item44',
                },
                {
                    label: <Link to="/smarthome/5">Smart Home Amazon Echo</Link>,
                    key: 'item45',
                },
            ],

        },
        {
            label: 'Linh kiện PC',
            key: 'pc',
            icon: <AppstoreOutlined />,
            children: [
                {
                    label: <Link to="/pc/1">Mainboard</Link>,
                    key: 'item51',
                },
                {
                    label: <Link to="/pc/2">CPU</Link>,
                    key: 'item52',
                },
                {
                    label: <Link to="/pc/3">RAM</Link>,
                    key: 'item53',
                },
                {
                    label: <Link to="/pc/4">VGA</Link>,
                    key: 'item54',
                },
                {
                    label: <Link to="/pc/5">SSD</Link>,
                    key: 'item55',
                },
                {
                    label: <Link to="/pc/6">HDD</Link>,
                    key: 'item56',
                },
            ],
        }

    ];
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click', e);
    };
    return (
        <>
            <div className='header-container'>
                <header className="page-header">
                    <div className="page-header__top">
                        <div className="page-header__toggle" onClick={() => {
                            setOpenDrawer(true)
                        }}>☰</div>
                        <div className='page-header__logo'>
                            <img
                                src="/hoangvantek.png"
                                style={{
                                    height: '60px',
                                    width: '60px',
                                    marginRight: '-10px',
                                    marginTop: 5
                                }}
                            />
                            <span className='logo-name' onClick={() => navigate('/')}>
                                HOANG VAN TEK
                            </span>
                            <input
                                className="input-search" type={'text'}
                                placeholder="Bạn tìm gì hôm nay"
                                value={props.searchTerm}
                                onChange={(e) => props.setSearchTerm(e.target.value)}

                            />
                            <span className='logo-name'>
                                <VscSearchFuzzy className='icon-search' />
                            </span>

                        </div>
                    </div>

                    <nav className="page-header__bottom">
                        <ul id="navigation" className="navigation">
                            <li className="navigation__item mobile " >
                                <Button
                                    type="primary"
                                    shape="round"
                                    style={{
                                        backgroundColor: '#ff4d4f',
                                        borderColor: '#ff4d4f',
                                        color: 'white'
                                    }}
                                    className='btn-phone'
                                    onClick={() => window.open('tel:0917946024')}
                                >
                                    <PhoneOutlined />
                                    <span className='phone'>0917946024</span>
                                </Button>
                            </li>
                            <li className="navigation__item mobile"><Divider type='vertical' /></li>
                            <li className="navigation__item mobile " >
                                <Button
                                    type="primary"
                                    shape="round"
                                    style={{
                                        backgroundColor: '#4284f5',
                                        borderColor: '#4284f5',
                                        color: 'white'
                                    }}
                                    onClick={() => window.open('https://www.facebook.com/leewangzan')}
                                >
                                    <FaFacebook />
                                </Button>
                            </li>

                            <li className="navigation__item mobile " >
                                <Button
                                    type="primary"
                                    shape="round"
                                    style={{
                                        backgroundColor: '#f54242',
                                        borderColor: '#f54242',
                                        color: 'white'
                                    }}
                                    onClick={() => window.open('https://www.youtube.com/channel/UC-dANBh4ITN_6eRyDRRSLZw')}
                                >
                                    <FaYoutube />
                                </Button>
                            </li>
                            <li className="navigation__item mobile"><Divider type='vertical' /></li>
                            <li className="navigation__item ">
                                {!isMobile
                                    ?
                                    <Popover
                                        className="popover-carts"
                                        placement="topRight"
                                        rootClassName="popover-carts"
                                        title={"Sản phẩm mới thêm"}
                                        content={contentPopover}
                                        arrow={true}>
                                        <Badge
                                            count={carts?.length ?? 0}
                                            size={"small"}
                                            showZero
                                        >
                                            <FiShoppingCart className='icon-cart' />
                                        </Badge>
                                    </Popover>

                                    :
                                    <Badge
                                        count={carts?.length ?? 0}
                                        size={"small"}
                                        showZero
                                        onClick={() => navigate("/order")}
                                    >
                                        <FiShoppingCart className='icon-cart' />
                                    </Badge>
                                }
                            </li>
                            <li className="navigation__item mobile"><Divider type='vertical' /></li>
                            <li className="navigation__item mobile">
                                {!isAuthenticated ?
                                    <span onClick={() => navigate('/login')}> Tài Khoản</span>
                                    :
                                    <Dropdown menu={{ items }} trigger={['click']}>
                                        <Space >
                                            <Avatar src={urlAvatar} />
                                            {user?.fullName}
                                        </Space>
                                    </Dropdown>
                                }
                            </li>
                        </ul>
                    </nav>
                </header>
                <div className='page-header'>
                    <Menu
                        inlineIndent={24}
                        className='category-bar'
                        mode="horizontal"
                        items={listCategory_product}
                        onClick={onClick}
                    />
                </div>

            </div>
            <Drawer
                title="Menu chức năng"
                placement="left"
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
            >
                <p>Quản lý tài khoản</p>
                <Divider />

                <p onClick={() => handleLogout()}>Đăng xuất</p>
                <Divider />
            </Drawer>

            <ManageAccount
                isModalOpen={openManageAccount}
                setIsModalOpen={setOpenManageAccount}
            />

        </>
    )
};