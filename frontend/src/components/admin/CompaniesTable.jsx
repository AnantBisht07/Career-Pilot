import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const navigate = useNavigate();
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filteredCompany =
      companies.length > 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  if (!companies || companies.length === 0) {
    return (
      <h1 className="mt-16 text-center text-xl text-gray-200">
        Let’s Get Started – Add Your First Company!
      </h1>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="w-full text-left">
        <TableCaption className="text-gray-300">
          A list of your recent registered companies
        </TableCaption>
        <TableHeader>
          <TableRow className="border-b border-gray-700 ">
            <TableHead className="w-1/5 px-4 py-2 text-gray-200">Logo</TableHead>
            <TableHead className="w-2/5 px-4 py-2 text-gray-200">Name</TableHead>
            <TableHead className="w-1/5 px-4 py-2 text-gray-200">Date</TableHead>
            <TableHead className="w-1/5 px-4 py-2 text-gray-200 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.isArray(filterCompany) &&
            filterCompany?.map((company, idx) => (
              <TableRow key={idx} className="border-b border-gray-700">
                <TableCell className="px-4 py-2">
                  <Avatar>
                    <AvatarImage src={company.logo} />
                  </Avatar>
                </TableCell>
                <TableCell className="px-4 py-2 text-gray-200">{company.name}</TableCell>
                <TableCell className="px-4 py-2 text-gray-200">
                  {company.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="px-4 py-2 text-right cursor-pointer text-gray-200">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`, {
                            state: { companyName: company.name },
                          })
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer "
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
