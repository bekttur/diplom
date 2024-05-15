import { Button, DropdownMenu } from '@radix-ui/themes';
import CardUser from '../card/CardUser';
import { Link } from 'react-router-dom';
// @ts-ignore
import { useTranslation } from 'react-i18next';
import useLogout from '../../../hooks/useLogout';

const Dropdown = () => {
  const { logout } = useLogout();

  const { t } = useTranslation('translation');

  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button
            style={{
              height: 'fit-content',
              padding: 0,
              borderRadius: 8,
              outline: 'none',
            }}
            variant='ghost'
          >
            <CardUser />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <Link to='/profile'>
            <DropdownMenu.Item
              // @ts-ignore
              shortcut={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='14'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='lucide lucide-user'
                >
                  <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
                  <circle cx='12' cy='7' r='4' />
                </svg>
              }
            >
              {t('menu.profile')}
            </DropdownMenu.Item>
          </Link>
          <DropdownMenu.Separator />
          <Link to='/edit-profile'>
            <DropdownMenu.Item
              // @ts-ignore
              shortcut={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='14'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='lucide lucide-user-cog'
                >
                  <circle cx='18' cy='15' r='3' />
                  <circle cx='9' cy='7' r='4' />
                  <path d='M10 15H6a4 4 0 0 0-4 4v2' />
                  <path d='m21.7 16.4-.9-.3' />
                  <path d='m15.2 13.9-.9-.3' />
                  <path d='m16.6 18.7.3-.9' />
                  <path d='m19.1 12.2.3-.9' />
                  <path d='m19.6 18.7-.4-1' />
                  <path d='m16.8 12.3-.4-1' />
                  <path d='m14.3 16.6 1-.4' />
                  <path d='m20.7 13.8 1-.4' />
                </svg>
              }
            >
              {t('menu.settings')}
            </DropdownMenu.Item>
          </Link>

          {/* <DropdownMenu.Sub>
            {authUser?.role === 'admin' || authUser?.role === 'сonnector' ? (
              <DropdownMenu.SubTrigger>
                {' '}
                {t('menu.more')}
              </DropdownMenu.SubTrigger>
            ) : null}
            <DropdownMenu.SubContent>
              {authUser?.role === 'admin' ? (
                <>
                  <Link to='/add/users'>
                    <DropdownMenu.Item>
                      {' '}
                      {t('menu.editUser')}…
                    </DropdownMenu.Item>
                  </Link>
                  <Link to='/add/dialect'>
                    <DropdownMenu.Item>
                      {t('menu.editDialect')}…
                    </DropdownMenu.Item>
                  </Link>
                  <DropdownMenu.Separator />
                </>
              ) : null}

              <Link to='/add'>
                <DropdownMenu.Item>{t('menu.addDialect')}…</DropdownMenu.Item>
              </Link>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub> */}

          <DropdownMenu.Separator />
          <Link to='/login' onClick={logout}>
            <DropdownMenu.Item
              // @ts-ignore
              shortcut={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='12'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='lucide lucide-log-out'
                >
                  <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
                  <polyline points='16 17 21 12 16 7' />
                  <line x1='21' x2='9' y1='12' y2='12' />
                </svg>
              }
              color='red'
            >
              {t('menu.logout')}
            </DropdownMenu.Item>
          </Link>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default Dropdown;
