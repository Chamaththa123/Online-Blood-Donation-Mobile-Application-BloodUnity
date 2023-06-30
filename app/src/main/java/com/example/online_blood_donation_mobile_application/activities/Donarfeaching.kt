package com.example.online_blood_donation_mobile_application.activities

import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.TextView
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.online_blood_donation_mobile_application.R
import com.example.online_blood_donation_mobile_application.adapter.DonorAdapter
import com.example.online_blood_donation_mobile_application.models.DonatorModel
import com.google.firebase.database.*

class Donarfeaching : AppCompatActivity() {

    private lateinit var donorRecyclerView: RecyclerView
    private lateinit var tvLoadingData: TextView
    private lateinit var donorList: ArrayList<DonatorModel>
    private lateinit var dbRef: DatabaseReference

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_donarfeaching)

        donorRecyclerView = findViewById(R.id.rvDonor)
        donorRecyclerView.layoutManager = LinearLayoutManager(this)
        donorRecyclerView.setHasFixedSize(true)
        tvLoadingData = findViewById(R.id.tvLoadingData)

        donorList = arrayListOf<DonatorModel>()

        getEmployeesData()
    }

    private fun getEmployeesData() {

        donorRecyclerView.visibility = View.GONE
        tvLoadingData.visibility = View.VISIBLE

        dbRef = FirebaseDatabase.getInstance().getReference("Donator")

        dbRef.addValueEventListener(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                donorList.clear()
                if (snapshot.exists()){
                    for (empSnap in snapshot.children){
                        val donorData = empSnap.getValue(DonatorModel::class.java)
                        donorList.add(donorData!!)
                    }
                    val mAdapter = DonorAdapter(donorList)
                    donorRecyclerView.adapter = mAdapter

//                    mAdapter.setOnItemClickListener(object : DonorAdapter.onItemClickListener{
//                        override fun onItemClick(position: Int) {
//
//                            val intent = Intent(this@Donarfeaching, EmployeeDetailsActivity::class.java)
//
//                            //put extras
//                            intent.putExtra("empId", empList[position].empId)
//                            intent.putExtra("empName", empList[position].empName)
//                            intent.putExtra("empAge", empList[position].empAge)
//                            intent.putExtra("empSalary", empList[position].empSalary)
//                            startActivity(intent)
//                        }
//
//                    })

                    donorRecyclerView.visibility = View.VISIBLE
                    tvLoadingData.visibility = View.GONE
                }
            }

            override fun onCancelled(error: DatabaseError) {
                TODO("Not yet implemented")
            }

        })
    }
}