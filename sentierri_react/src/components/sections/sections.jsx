
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import BoltIcon from '@mui/icons-material/Bolt';
import StartIcon from '@mui/icons-material/Start';
import DnsIcon from '@mui/icons-material/Dns';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddBoxIcon from '@mui/icons-material/AddBox';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import ViewListIcon from '@mui/icons-material/ViewList';
import WidgetsIcon from '@mui/icons-material/Widgets';
import CategoryIcon from '@mui/icons-material/Category';
import TuneIcon from '@mui/icons-material/Tune';
import StorefrontIcon from '@mui/icons-material/Storefront';


const sections = [
    {
      icon: DashboardIcon,
      label: 'DASHBOARD',
      link: '/',
      items: [
        { icon: BoltIcon, label: 'Quick 1', link: '/' },
        { icon: BoltIcon, label: 'Quick 2' },
      ],
    },
    {
      icon: CheckroomIcon,
      label: 'PLM',
      items: [
        { icon: StartIcon, label: 'Prototypes' },
        { icon: DnsIcon, label: 'Models' },
      ],
    },
    {
      icon: ContactMailIcon,
      label: 'CRM',
      items: [
        { icon: PeopleIcon, label: 'Customers', link: '/customers/' },
        { icon: StorefrontIcon, label: 'Shops', link: '/shops/' },
        { icon: ListAltIcon, label: 'Order Book' },
        { icon: AddBoxIcon, label: 'New CPO' },
        { icon: AddBoxIcon, label: 'New Customer', link: '/customers/new' },
      ],
    },
    {
      icon: MoveToInboxIcon,
      label: 'SCM',
      items: [
        { icon: PeopleIcon, label: 'Suppliers', link: '/suppliers' },
        { icon: ListAltIcon, label: "PO's" },
      ],
    },
    {
      icon: WarehouseIcon,
      label: 'INVENTORY',
      link: '/raw-materials',
      items: [
        { icon: ViewListIcon, label: 'Stock' },
        { icon: WidgetsIcon, label: "Raw materials", link: '/raw-materials' },
        { icon: AddBoxIcon, label: 'New Material', link: '/raw-materials/new' },
      ],
    },
    {
      icon: TuneIcon,
      label: 'SETTINGS',
      link: '/settings',
      items: [
        { icon: CategoryIcon, label: 'Categories', link: '/settings/categories' },
      ],
    },
  ];
  
  export default sections;