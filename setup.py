from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in ticket_ms/__init__.py
from ticket_ms import __version__ as version

setup(
	name="ticket_ms",
	version=version,
	description="Ticket Management System for Knight Frank and Shell",
	author="Simon Wanyama",
	author_email="wanyamasp@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
